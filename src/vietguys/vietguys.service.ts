import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {Method} from "axios";


const VIETGUYS_ERROR_STATE = {
    "0": "Gửi thành công",
    "-1": "Chưa truyền đầy đủ tham số",
    "-2": "Máy chủ đang bận",
    "-3": "Không tìm thấy tài khoản người dùng",
    "-4": "Tài khoản bị khóa",
    "-5": "Thông tin xác thực chưa chính xác",
    "-6": "Chưa kích hoạt tính năng gửi qua API",
    "-7": "IP bị giới hạn truy cập",
    "-8": "Tên thương hiệu chưa khai báo",
    "-9": "Tài khoản hết credits gửi tin",
    "-10": "Số điện thoại chưa chính xác",
    "-11": "Số điện thoại nằm trong danh sách từ chối nhận tin",
    "-12": "Hết credits gửi tin",
    "-13": "Tên thương hiệu chưa khai báo",
    "-14": "Số kí tự vượt quá 459 kí tự (lỗi tin nhắn dài)",
    "-16": "Gửi trùng số điện thoại, thương hiệu, nội dung trong 01 phút",
    "-18": "Nội dung có chứa từ khoá quảng cáo",
    "-19": "Vượt quá số tin nhắn giớn hạn trong một ngày do kh tự qui định",
    "-20": "Template chưa được đăng ký",
    "-21": "Nội dung không phải OTP",
    "-22": "Lỗi chuyển mạng hoặc brandname chưa được set Telco",
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


@Injectable()
export class VietguysService {
    private _baseURL = process.env.VIETGUYS_URL || 'https://cloudsms.vietguys.biz:4438/api/index.php'
    private _timeout = 60 * 1000
    private headers = {
        'Content-Type': 'application/json'
    }

    constructor(private httpService: HttpService) {
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

        const request_id = uuidv4()


        const dump_json_kw = dump_data || data

        //TODO: improve logger
        console.log('params_kw', params)
        console.log('dump_json_kw', dump_json_kw)


        try {
            const resp = await this.httpService.request({
                baseURL: this._baseURL,
                url: endpoint,
                method,
                data,
                params,
                timeout,
                headers: this.headers
            }).toPromise()

            const res_json = resp.data

            if (res_json['error'] !== 0) {
                const error_code = res_json['error_code']
                const error_message = VIETGUYS_ERROR_STATE[error_code] || 'UNKNOWN'
                //logger.error
                throw Error()
            }

            return res_json
        } catch (e) {
            const message = e.message
            //logger.error
            throw Error()
        }
    }

    private _load_otp_template(otp: string) {
        if (process.env.ENVIRONMENT !== 'LIVE')
            return 'Anh/Chi dung quen minh co hen voi chung toi vao luc 19h ngay 1/1/2020 Hen gap lai. Tran Trong !'
        return `${otp} la OTP cho myLocal.vn, co hieu luc trong 3 phut. Vui long KHONG chia se. ${otp} is OTP for myLocal.vn app, valid within 3 mins. Please DO NOT share`
    }

    private _load_find_me_success_template() {
        return 'Đã tìm đồ thành công'
    }

    private _send_sms_to_phone_number(phone_number: string, sms: string) {
        const data = {
            u: process.env.VIETGUYS_USERNAME || 'mylocalvn',
            pwd: process.env.VIETGUYS_PASSWORD || 'jq5j5',
            from: process.env.VIETGUYS_SENDER || 'TEST-DS',
            phone: phone_number,
            sms: sms,
            cmd: "ABC",
            bid: "123",
            json: "1"
        }
        return this.request({
            method: 'post',
            endpoint: '',
            data
        })
    }

    public send_otp_to_phone_number(phone_number: string, otp: string) {
        const sms = this._load_otp_template(otp)
        return this._send_sms_to_phone_number(phone_number, sms)
    }

    public send_sms_to_find_me_success_template(phone_number: string) {
        if (process.env.ENVIRONMENT !== 'LIVE') return null
        const sms = this._load_find_me_success_template()
        return this._send_sms_to_phone_number(phone_number, sms)
    }
}
