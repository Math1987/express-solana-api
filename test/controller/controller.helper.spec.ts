import { expect } from "chai";
import {
    gotBody,
    isSolanaAddress,
    isSolanaTransactionSignature,
    isPseudo,
    isMongoId
} from "../../src/controller/helper.controller" ;


//MXZON ACCOUNT ADDRESS
//FfYeVASAm2nDzcC5ckorecT1u8ybFwrCZnMi8sXrtf3P

//ADRESS HK5qCeciMuzmXQAFnKjSiDQSHowvbRWEvrKPsW6SUxbA
//OLD TRANSACTION CySMuLj6MT2XUxrcYC1x6Z7AXWh3nUzaDLXRxRE6jYaZJZu15LQVqVhy52vbcggy8KakRkdD2Akt6RdAeSRzDoi
//OLD TRANSACTION WT4GpyoTmafPmEG51XHFYaPSZQhx2PtBphMcK7WSj2PYYaM3U5uiPuyBjF3Kh9CEkASBHaqq2QcTc5QSc2cWbWU
//OLD TRANSACTION  3yeHaFL8N5gXHCZ5o7ZEY3fQ5etBVQUW7embk8LLh3gL7dEwXLh2hFfnS9b8YmCEKD5byZ2m38B5afpPNdNpG6if

describe("controller.helper", () => {

    it("gotBodyAndValues: should return false", () => {
        expect(gotBody(undefined)).equal(false);
    })
    it("gotBody: should return false", () => {
        expect(gotBody("BONJOUR")).equal(false);
    })
    it("gotBody: should return false", () => {
        expect(gotBody({ super : "génial"})).equal(false);
    })
    it("gotBody: should return true", () => {
        expect(gotBody({ body : { bonjour : true }})).equal(true);
    });

    it("isSolanaAdress: should return false", () => {
        expect(isSolanaAddress("BONJOUR!!!")).equal(false);
    });
    it("isSolanaAdress: should return false", () => {
        expect(isSolanaAddress(666)).equal(false);
    });
    it("isSolanaAdress: should return false", () => {
        expect(isSolanaAddress("FAAAVASAm2nDzcC5ckorecT1u8ybFwrCZnMi8sXrtf3PFAAAVASAm2nDzcC5ckorecT1u8ybFwrCZnMi8sXrtf3P")).equal(false);
    });
    it("isSolanaAdress: should return true", () => {
        expect(isSolanaAddress("FfYeVASAm2nDzcC5ckorecT1u8ybFwrCZnMi8sXrtf3P")).equal(true);
    });

    it("isSolanaTransactionSignature: should return false", () => {
        expect(isSolanaTransactionSignature("FfYeVASAm2nDzcC5ckorecT1u8ybFwrCZnMi8sXrtf3P")).equal(false);
    });
    it("isSolanaTransactionSignature: should return false", () => {
        expect(isSolanaTransactionSignature(65165461654)).equal(false);
    });
    it("isSolanaTransactionSignature: should return true", () => {
        expect(isSolanaTransactionSignature("CySMuLj6MT2XUxrcYC1x6Z7AXWh3nUzaDLXRxRE6jYaZJZu15LQVqVhy52vbcggy8KakRkdD2Akt6RdAeSRzDoi")).equal(true);
    });

    it("isPseudo: should return false", () => {
        expect(isPseudo("CySMuLj6MT2XUxrcYC1x6Z7AXWh3nUzaDLXRxRE6jYaZJZu15LQVqVhy52vbcggy8KakRkdD2Akt6RdAeSRzDoi")).equal(false);
    });
    it("isPseudo: should return true", () => {
        expect(isPseudo("I am Satoshi Nakamoto (or not)")).equal(true);
    });

    it("isMongoId: should return false", () => {
        expect(isMongoId("I am Satoshi Nakamoto (or not)")).equal(false);
    });
    it("isMongoId: should return false", () => {
        expect(isMongoId("61eff53d143e7b0ed3743815HEY!")).equal(false);
    });
    it("isMongoId: should return true", () => {
        expect(isMongoId("61eff53d143e7b0ed3743815")).equal(true);
    });

})