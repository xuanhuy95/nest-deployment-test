import * as crypto from 'crypto'

function assert(condition, message?: string) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}


enum Tag {
    IDPayloadFormatIndicator = "00", // (M) Payload Format Indicator
    IDPointOfInitiationMethod = "01", // (O) Point of Initiation Method
    IDMerchantAccountInformationRangeStart = "02", // (M) 2-51 Merchant Account Information
    IDMerchantAccountInformationRangeEnd = "51", // (M) 2-51 Merchant Account Information
    IDMerchantCategoryCode = "52", // (M) Merchant Category Code
    IDTransactionCurrency = "53", // (M) Transaction Currency
    IDTransactionAmount = "54", // (C) Transaction Amount
    IDTipOrConvenienceIndicator = "55", // (O) Tip or Convenience Indicator
    IDValueOfConvenienceFeeFixed = "56", // (C) Value of Convenience Fee Fixed
    IDValueOfConvenienceFeePercentage = "57", // (C) Value of Convenience Fee Percentage
    IDCountryCode = "58", // (M) Country Code
    IDMerchantName = "59", // (M) Merchant Name
    IDMerchantCity = "60", // (M) Merchant City
    IDPostalCode = "61", // (O) Postal Code
    IDAdditionalDataFieldTemplate = "62", // (O) Additional Data Field Template
    IDCRC = "63", // (M) CRC
    IDMerchantInformationLanguageTemplate = "64", // (O) Merchant Information— Language Template
    IDRFUForEMVCoRangeStart = "65", // (O) 65-79 RFU for EMVCo
    IDRFUForEMVCoRangeEnd = "79", // (O) 65-79 RFU for EMVCo
    IDUnreservedTemplatesRangeStart = "80", // (O) 80-99 Unreserved Templates
    IDUnreservedTemplatesRangeEnd = "99", // (O) 80-99 Unreserved Templates

}


enum MerchantInformationID {
    MerchantInformationIDLanguagePreference = "00", // (M) Language Preference
    MerchantInformationIDMerchantName = "01", // (M) Merchant Name
    MerchantInformationIDMerchantCity = "02", // (O) Merchant City
    MerchantInformationIDRFUforEMVCoRangeStart = "03", // (O) 03-99 RFU for EMVCo
    MerchantInformationIDRFUforEMVCoRangeEnd = "99", // (O) 03-99 RFU for EMVCo
}


enum AdditionalID {
    AdditionalIDBillNumber = "01", // (O) Bill Number
    AdditionalIDMobileNumber = "02", // (O) Mobile Number
    AdditionalIDStoreLabel = "03", // (O) Store Label
    AdditionalIDLoyaltyNumber = "04", // (O) Loyalty Number
    AdditionalIDReferenceLabel = "05", // (O) Reference Label
    AdditionalIDCustomerLabel = "06", // (O) Customer Label
    AdditionalIDTerminalLabel = "07", // (O) Terminal Label
    AdditionalIDPurposeTransaction = "08", // (O) Purpose Transaction
    AdditionalIDAdditionalConsumerDataRequest = "09", // (O) Additional Consumer Data Request
    AdditionalIDRFUforEMVCoRangeStart = "10", // (O) RFU for EMVCo
    AdditionalIDRFUforEMVCoRangeEnd = "49", // (O) RFU for EMVCo
    AdditionalIDPaymentSystemSpecificTemplatesRangeStart = "50", // (O) Payment System Specific Templates
    AdditionalIDPaymentSystemSpecificTemplatesRangeEnd = "99", // (O) Payment System Specific Templates


}

enum SKUStatus {
    TEST = 'TEST',
    REAL = 'REAL'
}

enum MerchantAccountInformationID {
    MerchantAccountInformationIDGloballyUniqueIdentifier = '00', //
    MerchantAccountInformationIDPaymentNetworkSpecificStart = '01', //  # (O) 03-99 RFU for EMVCo
    MerchantAccountInformationIDPaymentNetworkSpecificEnd = '99', //  # (O) 03-99 RFU for EMVCo
}

enum PointOfInitiationMethod {
    Static = "11",
    Dynamic = "12"
}


class TLV {
    ID: string;
    Value: string;

    constructor(ID: string, Value: string) {
        this.ID = ID
        this.Value = Value
    }

    generate_string() {
        if (!this.Value) {
            return ''
        }
        const length = '0' + this.Value.toString().length.toString()
        return `${this.ID}${length.slice(-2)}${this.Value}`
    }

    JSON() {
        return {
            'Tag': this.ID,
            'Value': this.Value
        }
    }

}

class AdditionalDataFieldTemplate {
    LoyaltyNumber: TLV;
    ReferenceLabel: TLV;
    CustomerLabel: TLV;
    TerminalLabel: TLV;
    BillNumber: TLV;
    MobileNumber: TLV;
    StoreLabel: TLV;
    PurposeTransaction: TLV;
    AdditionalDataFieldTemplate: TLV;
    AdditionalConsumerDataRequest: TLV;

    constructor() {
        this.LoyaltyNumber = new TLV(null, '')
        this.ReferenceLabel = new TLV(null, '')
        this.CustomerLabel = new TLV(null, '')
        this.TerminalLabel = new TLV(null, '')
        this.BillNumber = new TLV(null, '')
        this.MobileNumber = new TLV(null, '')
        this.StoreLabel = new TLV(null, '')
        this.PurposeTransaction = new TLV(null, '')
        this.AdditionalDataFieldTemplate = new TLV(null, '')
        this.AdditionalConsumerDataRequest = new TLV(null, '')
    }

    generate_string() {
        let t = ""
        t += this.LoyaltyNumber.generate_string()
        t += this.ReferenceLabel.generate_string()
        t += this.CustomerLabel.generate_string()
        t += this.TerminalLabel.generate_string()
        t += this.BillNumber.generate_string()
        t += this.MobileNumber.generate_string()
        t += this.StoreLabel.generate_string()
        t += this.PurposeTransaction.generate_string()
        t += this.AdditionalDataFieldTemplate.generate_string()
        t += this.AdditionalConsumerDataRequest.generate_string()
        return `${Tag.IDAdditionalDataFieldTemplate}${t.length}${t}`
    }

    JSON() {
        return {
            "LoyaltyNumber": this.LoyaltyNumber.JSON(),
            "ReferenceLabel": this.ReferenceLabel.JSON(),
            "CustomerLabel": this.CustomerLabel.JSON(),
            "PurposeTransaction": this.PurposeTransaction.JSON(),
            "BillNumber": this.BillNumber.JSON(),
            "MobileNumber": this.MobileNumber.JSON(),
            "StoreLabel": this.StoreLabel.JSON(),
            "TerminalLabel": this.TerminalLabel.JSON(),
            "AdditionalConsumerDataRequest": this.AdditionalConsumerDataRequest.JSON(),
        }

    }

    SetLoyaltyNumber(value: string) {
        this.LoyaltyNumber = new TLV(AdditionalID.AdditionalIDLoyaltyNumber, value)
    }


    SetReferenceLabel(value: string) {
        this.ReferenceLabel = new TLV(AdditionalID.AdditionalIDReferenceLabel, value)
    }


    SetCustomerLabel(value: string) {
        this.CustomerLabel = new TLV(AdditionalID.AdditionalIDCustomerLabel, value)
    }


    SetPurposeTransaction(value: string) {
        this.PurposeTransaction = new TLV(AdditionalID.AdditionalIDPurposeTransaction, value)
    }


    SetBillNumber(value: string) {
        this.BillNumber = new TLV(AdditionalID.AdditionalIDBillNumber, value)
    }


    SetMobileNumber(value: string) {
        this.MobileNumber = new TLV(AdditionalID.AdditionalIDMobileNumber, value)
    }


    SetStoreLabel(value: string) {
        this.StoreLabel = new TLV(AdditionalID.AdditionalIDStoreLabel, value)
    }


    SetTerminalLabel(value: string) {
        this.TerminalLabel = new TLV(AdditionalID.AdditionalIDTerminalLabel, value)
    }


    SetAdditionalConsumerDataRequest(value: string) {
        this.AdditionalConsumerDataRequest = new TLV(AdditionalID.AdditionalIDAdditionalConsumerDataRequest, value)
    }


}


class MerchantAccountInformation {
    PaymentNetworkSpecific;
    GloballyUniqueIdentifier: TLV;

    constructor() {
        this.PaymentNetworkSpecific = []
    }

    generate_string(key) {
        let t = ""
        t += this.GloballyUniqueIdentifier.generate_string()
        return `${key}${t.length}${t}`
    }

    JSON() {
        return {
            "GloballyUniqueIdentifier": this.GloballyUniqueIdentifier.JSON(),
            "PaymentNetworkSpecific": this.PaymentNetworkSpecific.map(item => item.JSON()),
        }
    }

    SetGloballyUniqueIdentifier(value: string) {
        this.GloballyUniqueIdentifier = new TLV(
            MerchantAccountInformationID.MerchantAccountInformationIDGloballyUniqueIdentifier, value)
    }

    AddPaymentNetworkSpecific(tag: MerchantAccountInformationID, value: string) {
        this.PaymentNetworkSpecific.append(new TLV(tag, value))
    }


}


class MerchantInformationLanguageTemplate {
    MerchantName: TLV;
    MerchantCity: TLV;
    LanguagePreference: TLV;

    constructor() {
        this.MerchantName = new TLV(null, '')
        this.MerchantCity = new TLV(null, '')
        this.LanguagePreference = new TLV(null, '')
    }

    generate_string() {
        let t = ""
        t += this.MerchantName.generate_string()
        t += this.MerchantCity.generate_string()
        t += this.LanguagePreference.generate_string()
        return t
    }

    JSON() {
        return {
            "MerchantName": this.MerchantName.JSON(),
            "MerchantCity": this.MerchantCity.JSON(),
            "LanguagePreference": this.LanguagePreference.JSON(),
        }
    }

    validate() {
        if (this.LanguagePreference.Value) throw Error("LanguagePreference is mandatory")
        if (this.MerchantName.Value) throw Error("MerchantName is mandatory")
        return null
    }

    SetMerchantName(value: string) {
        this.MerchantName = new TLV(MerchantInformationID.MerchantInformationIDMerchantName, value)
    }


    SetMerchantCity(value: string) {
        this.MerchantCity = new TLV(MerchantInformationID.MerchantInformationIDMerchantCity, value)
    }


    SetLanguagePreference(value: string) {
        this.LanguagePreference = new TLV(MerchantInformationID.MerchantInformationIDLanguagePreference, value)
    }


}

class EMVQR {
    encoded_qr: string;
    PayloadFormatIndicator: TLV;
    PointOfInitiationMethod: TLV;
    TransactionAmount: TLV;
    TipOrConvenienceIndicator: TLV;
    ValueOfConvenienceFeeFixed: TLV;
    ValueOfConvenienceFeePercentage: TLV;
    CountryCode: TLV;
    MerchantName: TLV;
    MerchantCategoryCode: TLV;
    TransactionCurrency: TLV;
    MerchantCity: TLV;
    PostalCode: TLV;
    CRC: TLV;

    MerchantAccountInformation;

    AdditionalDataFieldTemplate: AdditionalDataFieldTemplate;
    MerchantInformationLanguageTemplate: MerchantInformationLanguageTemplate;

    constructor() {
        this.PayloadFormatIndicator = new TLV(null, '')
        this.PointOfInitiationMethod = new TLV(null, '')
        this.TransactionAmount = new TLV(null, '')
        this.TipOrConvenienceIndicator = new TLV(null, '')
        this.ValueOfConvenienceFeeFixed = new TLV(null, '')
        this.ValueOfConvenienceFeePercentage = new TLV(null, '')
        this.CountryCode = new TLV(null, '')
        this.MerchantName = new TLV(null, '')
        this.MerchantCity = new TLV(null, '')
        this.PostalCode = new TLV(null, '')
        this.CRC = new TLV(null, '')

        this.MerchantInformationLanguageTemplate = new MerchantInformationLanguageTemplate()
        this.MerchantAccountInformation = {}
    }

    SetPayloadFormatIndicator(value: string) {
        this.PayloadFormatIndicator = new TLV(Tag.IDPayloadFormatIndicator, value)
    }

    SetPointOfInitiationMethod(value) {
        this.PointOfInitiationMethod = new TLV(Tag.IDPointOfInitiationMethod, value)
    }


    SetMerchantCategoryCode(value) {
        this.MerchantCategoryCode = new TLV(Tag.IDMerchantCategoryCode, value)
    }


    SetTransactionCurrency(value) {
        this.TransactionCurrency = new TLV(Tag.IDTransactionCurrency, value)
    }


    SetCountryCode(value: string) {
        this.CountryCode = new TLV(Tag.IDCountryCode, value)
    }


    SetMerchantName(value: string) {
        this.MerchantName = new TLV(Tag.IDMerchantName, value)
    }


    SetMerchantCity(value: string) {
        this.MerchantCity = new TLV(Tag.IDMerchantCity, value)
    }


    SetPostalCode(value: string) {
        this.PostalCode = new TLV(Tag.IDPostalCode, value)
    }


    SetAdditionalDataFieldTemplate(value: AdditionalDataFieldTemplate) {
        this.AdditionalDataFieldTemplate = value
    }

    SetCRC(value: string) {
        this.CRC = new TLV(Tag.IDCRC, value)
    }

    SetTransactionAmount(value: string) {
        this.TransactionAmount = new TLV(Tag.IDTransactionAmount, value)
    }

    SetTipOrConvenienceIndicator(value: string) {
        this.TipOrConvenienceIndicator = new TLV(Tag.IDTipOrConvenienceIndicator, value)
    }

    SetValueOfConvenienceFeeFixed(value: string) {
        this.ValueOfConvenienceFeeFixed = new TLV(Tag.IDValueOfConvenienceFeeFixed, value)
    }

    SetValueOfConvenienceFeePercentage(value: string) {
        this.ValueOfConvenienceFeePercentage = new TLV(Tag.IDValueOfConvenienceFeePercentage, value)
    }

    AddMerchantAccountInformation(ID: MerchantAccountInformationID, value: MerchantAccountInformation) {
        this.MerchantAccountInformation[ID] = value
    }


    Validate() {
        if (!this.PayloadFormatIndicator.Value) throw Error('PayloadFormatIndicator is mandatory')
        if (!this.MerchantAccountInformation) throw Error('MerchantAccountInformation is mandatory')
        if (!this.MerchantCategoryCode.Value) throw Error('MerchantCategoryCode is mandatory')
        if (!this.TransactionCurrency.Value) throw Error('TransactionCurrency is mandatory')
        if (!this.CountryCode.Value) throw Error('CountryCode is mandatory')
        if (!this.MerchantName.Value) throw Error('MerchantName is mandatory')
        if (!this.MerchantCity.Value) throw Error('MerchantCity is mandatory')

        if (this.PointOfInitiationMethod.Value) {
            if (![PointOfInitiationMethod.Static, PointOfInitiationMethod.Dynamic].includes(this.PointOfInitiationMethod.Value as PointOfInitiationMethod)) {
                throw Error(`PointOfInitiationMethod should be \"11\" or \"12\", PointOfInitiationMethod: ${this.PointOfInitiationMethod.Value}`)
            }
        }
        return null
    }

    Encode() {
        this.Validate()
        return this.GeneratePayload()
    }

    private _sha256(raw) {
        const msgUint8 = new TextEncoder().encode(raw);                           // encode as (utf-8) Uint8Array
        const hashBuffer = crypto.createHash('sha256').update(msgUint8).digest('hex')
        crypto.createHash('sha256').update(msgUint8).digest('hex')
        return hashBuffer
        // // const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
        // const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
        // const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
        // return hashHex;
    }


    formatCrc(raw: string) {
        const hash_value = this._sha256(process.env.QR_HASH_SECRET + raw)
        const checksum = `${Tag.IDCRC}04${hash_value.slice(-4)}`
        return checksum
    }

    ascii_to_hexa(str) {
        const arr1 = [];
        for (let n = 0, l = str.length; n < l; n++) {
            const hex = Number(str.charCodeAt(n)).toString(16);
            arr1.push(hex);
        }
        return arr1.join('');
    }

    hex_to_ascii(hexx) {
        const hex = hexx.toString();//force conversion
        let str = '';
        for (let i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }


    GeneratePayload() {
        let s = ''
        s += this.PayloadFormatIndicator.generate_string()
        s += this.PointOfInitiationMethod.generate_string()

        const keys = Object.keys(this.MerchantAccountInformation)
        keys.sort()
        for (const key of keys) {
            s += this.MerchantAccountInformation[key].generate_string(key)
        }


        s += this.MerchantCategoryCode.generate_string()
        s += this.TransactionCurrency.generate_string()

        s += this.TransactionAmount.generate_string()
        s += this.TipOrConvenienceIndicator.generate_string()
        s += this.ValueOfConvenienceFeeFixed.generate_string()
        s += this.ValueOfConvenienceFeePercentage.generate_string()
        s += this.CountryCode.generate_string()
        s += this.MerchantName.generate_string()
        s += this.MerchantCity.generate_string()
        s += this.PostalCode.generate_string()

        s += this.AdditionalDataFieldTemplate.generate_string()

        s += this.formatCrc(s)

        return this.ascii_to_hexa(s)
    }

    public ParseAdditionalDataFieldTemplate(payload: string): AdditionalDataFieldTemplate {
        const additionalDataFieldTemplate = new AdditionalDataFieldTemplate()
        while (payload) {
            const tag = payload.slice(0, 2)
            const length = parseInt(payload.slice(2, 4))
            const value = payload.slice(4, 4 + length)
            payload = payload.slice(4 + length)

            if (tag == AdditionalID.AdditionalIDBillNumber) additionalDataFieldTemplate.SetBillNumber(value)
            if (tag == AdditionalID.AdditionalIDMobileNumber) additionalDataFieldTemplate.SetMobileNumber(value)
            if (tag == AdditionalID.AdditionalIDStoreLabel) additionalDataFieldTemplate.SetStoreLabel(value)
            if (tag == AdditionalID.AdditionalIDLoyaltyNumber) additionalDataFieldTemplate.SetLoyaltyNumber(value)
            if (tag == AdditionalID.AdditionalIDReferenceLabel) additionalDataFieldTemplate.SetReferenceLabel(value)
            if (tag == AdditionalID.AdditionalIDCustomerLabel) additionalDataFieldTemplate.SetCustomerLabel(value)
            if (tag == AdditionalID.AdditionalIDTerminalLabel) additionalDataFieldTemplate.SetTerminalLabel(value)
            if (tag == AdditionalID.AdditionalIDPurposeTransaction) additionalDataFieldTemplate.SetPurposeTransaction(value)
            if (tag == AdditionalID.AdditionalIDAdditionalConsumerDataRequest) additionalDataFieldTemplate.SetAdditionalConsumerDataRequest(value)


        }
        return additionalDataFieldTemplate
    }

    public ParseMerchantAccountInformation(payload: string): MerchantAccountInformation {
        const merchantAccountInformation = new MerchantAccountInformation()
        while (payload) {
            const tag = payload.slice(0, 2)
            const length = parseInt(payload.slice(2, 4))
            const value = payload.slice(4, 4 + length)
            payload = payload.slice(4 + length)

            if (tag == MerchantAccountInformationID.MerchantAccountInformationIDGloballyUniqueIdentifier) merchantAccountInformation.SetGloballyUniqueIdentifier(value)
            if (MerchantAccountInformationID.MerchantAccountInformationIDPaymentNetworkSpecificStart <= tag && tag <= MerchantAccountInformationID.MerchantAccountInformationIDPaymentNetworkSpecificEnd) {
                merchantAccountInformation.AddPaymentNetworkSpecific(tag as MerchantAccountInformationID, value)
            }

        }
        return merchantAccountInformation
    }

    ParseEMVQR(payload: string) {
        payload = this.hex_to_ascii(payload)
        const emvqr = new EMVQR()

        while (payload) {
            const tag = payload.slice(0, 2)
            const length = parseInt(payload.slice(2, 4))
            const value = payload.slice(4, 4 + length)
            payload = payload.slice(4 + length)
            if (tag == Tag.IDPayloadFormatIndicator) emvqr.SetPayloadFormatIndicator(value)
            if (tag == Tag.IDPointOfInitiationMethod) emvqr.SetPointOfInitiationMethod(value)
            if (tag == Tag.IDMerchantCategoryCode) emvqr.SetMerchantCategoryCode(value)
            if (tag == Tag.IDTransactionCurrency) emvqr.SetTransactionCurrency(value)
            if (tag == Tag.IDTransactionAmount) emvqr.SetTransactionAmount(value)
            if (tag == Tag.IDTipOrConvenienceIndicator) emvqr.SetTipOrConvenienceIndicator(value)
            if (tag == Tag.IDValueOfConvenienceFeeFixed) emvqr.SetValueOfConvenienceFeeFixed(value)
            if (tag == Tag.IDValueOfConvenienceFeePercentage) emvqr.SetValueOfConvenienceFeePercentage(value)
            if (tag == Tag.IDCountryCode) emvqr.SetCountryCode(value)
            if (tag == Tag.IDMerchantName) emvqr.SetMerchantName(value)
            if (tag == Tag.IDMerchantCity) emvqr.SetMerchantCity(value)
            if (tag == Tag.IDPostalCode) emvqr.SetPostalCode(value)

            if (tag == Tag.IDAdditionalDataFieldTemplate) {
                const adft = this.ParseAdditionalDataFieldTemplate(value)
                emvqr.SetAdditionalDataFieldTemplate(adft)
            }
            if (tag == Tag.IDCRC) emvqr.SetCRC(value)

            if (Tag.IDMerchantAccountInformationRangeStart <= tag && tag <= Tag.IDMerchantAccountInformationRangeEnd) {
                const t = this.ParseMerchantAccountInformation(value)
                emvqr.AddMerchantAccountInformation(tag as MerchantAccountInformationID, t)
            }

        }

        return emvqr

    }

    Decode(payload: string) {
        try {
            const emvqr: EMVQR = this.ParseEMVQR(payload)
            emvqr.Validate()
            const encoded = emvqr.Encode()
            assert(encoded == payload)
        } catch (e) {
            throw Error('Invalid data')
        }
        return emvqr
    }

    public JSON() {
        const keys = Object.keys(this.MerchantAccountInformation)
        const MerchantAccountInformation = {}
        for (const key of keys) {
            MerchantAccountInformation[key] = this.MerchantAccountInformation[key].JSON()
        }
        return {
            "PayloadFormatIndicator": this.PayloadFormatIndicator.JSON(),
            "PointOfInitiationMethod": this.PointOfInitiationMethod.JSON(),
            "TransactionAmount": this.TransactionAmount.JSON(),
            "TipOrConvenienceIndicator": this.TipOrConvenienceIndicator.JSON(),
            "ValueOfConvenienceFeeFixed": this.ValueOfConvenienceFeeFixed.JSON(),
            "ValueOfConvenienceFeePercentage": this.ValueOfConvenienceFeePercentage.JSON(),
            "CountryCode": this.CountryCode.JSON(),
            "MerchantName": this.MerchantName.JSON(),
            "MerchantCity": this.MerchantCity.JSON(),
            "PostalCode": this.PostalCode.JSON(),
            "CRC": this.CRC.JSON(),
            "AdditionalDataFieldTemplate": this.AdditionalDataFieldTemplate.JSON(),
            "MerchantInformationLanguageTemplate": this.MerchantInformationLanguageTemplate.JSON(),
            "MerchantAccountInformation": MerchantAccountInformation,
        }

    }


}


class SKU {
    ID;
    company_name;
    product_name;
    month;
    year;
    status;


    constructor(company_name: string, product_name: string, month: number, year: number, status: SKUStatus) {
        assert(company_name.length == 3)
        assert(product_name.length == 3)
        assert(1 <= month && month <= 12)
        assert(year.toString().length == 4)
        assert([SKUStatus.REAL, SKUStatus.TEST].includes(status))

        this.ID = AdditionalID.AdditionalIDPurposeTransaction
        this.company_name = company_name
        this.product_name = product_name
        this.month = ('0' + month).slice(-2)
        this.year = year.toString()
        this.status = status
    }

    generate_string() {
        const value = `${this.company_name}${this.product_name}${this.month}${this.year.slice(-2)}${this.status}`
        return `${this.ID}${value.length}${value}`
    }

    JSON() {
        return {
            "msg": "ok"
        }
    }


}

const emvqr = new EMVQR()
emvqr.SetPayloadFormatIndicator("01")
emvqr.SetPointOfInitiationMethod("11")
const merchantAccountInformationGUI = new MerchantAccountInformation()
merchantAccountInformationGUI.SetGloballyUniqueIdentifier("D83A151485B448F2B8530E4DDBD511C1")
emvqr.AddMerchantAccountInformation("26" as MerchantAccountInformationID, merchantAccountInformationGUI)


emvqr.SetMerchantCategoryCode("0000")
emvqr.SetTransactionCurrency("704")
emvqr.SetCountryCode("VN")
emvqr.SetMerchantName("LOCAL")
emvqr.SetMerchantCity("HOCHIMINH")

const additionalTemplate = new AdditionalDataFieldTemplate()
additionalTemplate.SetLoyaltyNumber("8401201152300321")

const sku = new SKU('MKP', 'SIM', 7, 2021, SKUStatus.TEST)
additionalTemplate.SetPurposeTransaction(sku.generate_string())
emvqr.SetAdditionalDataFieldTemplate(additionalTemplate)

const encoded = emvqr.Encode()
console.log('encoded', encoded)
const raw_emvqr = emvqr.Decode(encoded)
const json = raw_emvqr.JSON()
console.log('raw_emvqr', json['MerchantAccountInformation'])


