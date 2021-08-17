import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {Method} from "axios";
import {catchError, map, of} from "rxjs";
import {tap} from "rxjs/operators";


enum MobifoneStateResponse {
    SUCCESS = '0000',
    INVALID_PARAMS = '-1',
    LOST_NETWORK = '-2',
    REQUIRE_CANCEL_CURRENT_PACKAGE = '9994',
}


@Injectable()
export class MobifoneService {
    private _baseURL = process.env.MOBIFONE_URL || 'https://jsonplaceholder.typicode.com'
    private _timeout = 60 * 1000
    private _credential = Buffer.from(`${process.env.MOBIFONE_API_USERNAME || 'tourist'}:${process.env.MOBIFONE_API_PASSWORD || 'Welcomexinchao2VN@123#@!'}`,).toString('base64')

    constructor(private httpService: HttpService) {
    }

    //TODO: move to common
    private generate_random_key() {
        const random_key = Array.from({length: 16}, () => {
            let b = Math.floor(Math.random() * 127);
            b = ((b & 0xfe) | ((((b >> 1) ^ (b >> 2) ^ (b >> 3) ^ (b >> 4) ^ (b >> 5) ^ (b >> 6) ^ (b >> 7)) ^ 0x01) & 0x01));
            return ('0' + (b & 0xFF).toString(16)).slice(-2);
        }).join('')
        return random_key
    }

    private generate_asim_code(prefix: string, identity: string) {
        //TODO: create enum for prefix
        const random_key = this.generate_random_key()
        const timestamp = new Date().getTime() / 1000
        return `${prefix}_${identity}_${timestamp}_${random_key.slice(-6)}`
    }


    public async request({
                             endpoint,
                             method,
                             data,
                             params,
                             dump_data,
                             timeout,
                         }: { endpoint: string, method: Method, data?, params?, dump_data?, timeout?: number }) {
        if (!timeout) {
            timeout = this._timeout
        }


        const headers = {
            'user-agent': 'AsimServer/1.0',
            'charset': 'utf-8',
            'Authorization': `Basic ${this._credential}`
        }

        const dump_json_kw = dump_data || data

        //TODO: improve logger
        console.log('params_kw', params)
        console.log('dump_json_kw', dump_json_kw)


        try {
            const response = await this.httpService.request({
                baseURL: this._baseURL,
                url: endpoint,
                method,
                data,
                params,
                timeout,
                headers
            }).toPromise()

            //TODO:

            return response.data
        } catch (e) {
            const message = e.message
        }
    }

    public release_isdn(isdn: string) {
        return this.request({
            endpoint: `/ASIMISDNREUSED/${isdn}`,
            method: 'get'
        })

    }


    public get_nationality() {
        return this.request({
            endpoint: '/ASIMNATION',
            method: 'get'
        })
    }

    public get_province_code_for_id(id_no: string) {
        return this.request({
            endpoint: `/ASIMPROVINCE/${id_no}`,
            method: 'get'
        })
    }

    public get_province() {
        return this.request({
            endpoint: `/ASIMPROVINCE`,
            method: 'get'
        })
    }

    public get_district(province_id) {
        return this.request({
            endpoint: `/ASIMDISTRICT/${province_id}`,
            method: 'get'
        })
    }

    public get_ward(province_id: string, district_id: string) {
        return this.request({
            endpoint: `/ASIMDISTRICT/${province_id}/${district_id}`,
            method: 'get'
        })
    }


    public activate(data, dump_data = null) {
        //TODO: create interface for data
        return this.request({
            endpoint: '/api/ASIMDKTT',
            method: 'post',
            data,
            dump_data,
        })
    }

    public update_activated_sim(data, dump_data = null) {
        data = Object.assign(data, {method: 2})
        return this.request({
            endpoint: '/api/ASIMDKTT',
            method: 'post',
            data,
            dump_data,
        })
    }

    public subscribe_mobile_plan(isdn: string, code: string, asim_code: string) {
        let data = {
            isdn: isdn,
            code: code,
            action: 1,
            asim_code: asim_code,
        }
        if (process.env.ENVIRONMENT == 'staging') data = Object.assign(data, {sim: 1})

        try {
            const response = this.request({
                method: 'post',
                endpoint: '/api/ASIMDATA',
                data
            })
            return response || {}
        } catch (e) {
            return {
                code: MobifoneStateResponse.LOST_NETWORK,
                message: "lost network",
            }
        }
    }

    public unsubscribe_mobile_plan(isdn: string, asim_code: string) {
        let data = {
            isdn: isdn,
            action: 2,
            asim_code: asim_code,
        }

        if (process.env.ENVIRONMENT == 'staging') data = Object.assign(data, {sim: 1})

        return this.request({
            method: 'post',
            endpoint: '/api/ASIMDATA',
            data
        })
    }

    public get_isdn_info(isdn: string) {
        //TODO: create enum for action
        let data = {
            isdn: isdn,
            action: "ISDNINFO",
            asim_code: this.generate_asim_code(process.env.PREFIX_ASIM_CODE_ISDN, isdn),
        }
        if (process.env.ENVIRONMENT == 'staging') data = Object.assign(data, {sim: 1})

        return this.request({
            method: 'post',
            endpoint: '/api/ASIMINFO',
            data
        })
    }

    public get_package_info(isdn: string) {
        let data = {
            'isdn': isdn,
            'action': "PACKAGEINFO",
            "asim_code": this.generate_asim_code(process.env.PREFIX_ASIM_CODE_PACKAGE_INFO, isdn)
        }
        if (process.env.ENVIRONMENT == 'staging') data = Object.assign(data, {sim: 1})

        return this.request({
            method: 'post',
            endpoint: '/api/ASIMINFO',
            data
        })
    }

    public get_balance_info(isdn: string) {
        let data = {
            'isdn': isdn,
            'action': "BALANCE",
            "asim_code": this.generate_asim_code(process.env.PREFIX_ASIM_CODE_BALANCE_INFO, isdn)
        }
        if (process.env.ENVIRONMENT == 'staging') data = Object.assign(data, {sim: 1})

        return this.request({
            method: 'post',
            endpoint: '/api/ASIMINFO',
            data
        })
    }


}
