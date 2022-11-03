import anlz.*;
import csv.Api;
import csv.Csv;
import object.CodeAndGU;
import object.LivingPopulation;
import object.ResidentPopulation;

import java.util.List;

public class Main {
    public static void main(String[] args){

        // 상권-생활인구(유동인구) API -> CSV
//        StoreLivingPopulation storeLivingPopulation = new StoreLivingPopulation();
//        storeLivingPopulation.getApi();

        // 상권-생활인구(유동인구) CSV -> 최종 정리본 CSV
//        LivingPopulationStore livingPopulationStore = new LivingPopulationStore();
//        livingPopulationStore.combine();

        // 상권-상주인구(거주인구) API -> CSV
//        StoreResidentPopulation storeResidentPopulation = new StoreResidentPopulation();
//        storeResidentPopulation.getApi();

        // 상권-상주인구(거주인구) CSV -> 최종 정리본 CSV
//        ResidentPopulationStore residentPopulationStore = new ResidentPopulationStore();
//        residentPopulationStore.combine();

        // 상권-점포(점포수, 개업율, 폐업율) CSV 구이름 붙이기
//        StoreCount storeCount = new StoreCount();
//        storeCount.combine();

        // 상권-점포(구별)
//        StoreGu storeGu = new StoreGu();
//        storeGu.sum();

        // 상권-점포(구별+업종코드별)
//        StoreGuCS storeGuCS = new StoreGuCS();
//        storeGuCS.sum();

        // 상권-점포(구별+상권 구분코드별)
//        StoreGuDiv storeGuDiv = new StoreGuDiv();
//        storeGuDiv.sum();

        // 상권-변화지표
//        StoreChange storeChange = new StoreChange();
//        storeChange.getApi();

        // 상권-변화지표 구별로 다이나믹, 정체, 상권확장, 상권축소
//        StoreChangeGu storeChangeGu = new StoreChangeGu();
//        storeChangeGu.combine();

        // 상권 매출 (구별 + 분기별 + 업종별) 월 매출
//        StoreSalesMonth storeSalesMonth =new StoreSalesMonth();
//        storeSalesMonth.combine();

        // 상권 매출 요일, 시간대, 성별, 연령별 비율
//        StoreSalesVarious storeSalesVarious =new StoreSalesVarious();
//        storeSalesVarious.combine();

        // 상권 구별 정보
//        ResultStore resultStore = new ResultStore();
//        resultStore.combine();

        // 점포 수 업종별 top 3
//        StoreCountTop storeCountTop = new StoreCountTop();
//        storeCountTop.combine();

        // 개/폐업 높은 업종 및 상권
//        StoreOpenCloseTop storeOpenCloseTop = new StoreOpenCloseTop();
//        storeOpenCloseTop.combine();

        // 유동인구 최종 전처리
//        ResultLivingPopulation resultLivingPopulation = new ResultLivingPopulation();
//        resultLivingPopulation.combine();

        /////////////////////////////////////////////////////////////////////////////////////////////

        // 상권배후지-생활인구(유동인구) API -> CSV
//        StoreHinLivingPopulation storeHinLivingPopulation = new StoreHinLivingPopulation();
//        storeHinLivingPopulation.getApi();

        // 상권배후지-생활인구(유동인구) CSV -> 최종 정리본 CSV
//        LivingPopulationStoreHin livingPopulationStore = new LivingPopulationStoreHin();
//        livingPopulationStore.combine();

        // 상권배후지-상주인구(거주인구) API -> CSV
//        StoreHinResidentPopulation storeResidentPopulation = new StoreHinResidentPopulation();
//        storeResidentPopulation.getApi();

        // 상권배후지-상주인구(거주인구) CSV -> 최종 정리본 CSV
//        ResidentPopulationStoreHin residentPopulationStore = new ResidentPopulationStoreHin();
//        residentPopulationStore.combine();

        // 상권배후지-점포(점포수, 개업율, 폐업율) CSV 구이름 붙이기
//        StoreHinCount storeCount = new StoreHinCount();
//        storeCount.combine();

        // 상권배후지-점포(구별)
//        StoreHinGu storeGu = new StoreHinGu();
//        storeGu.sum();

        // 상권배후지 매출 (구별 + 분기별 + 업종별) 월 매출
//        StoreHinSalesMonth storeSalesMonth =new StoreHinSalesMonth();
//        storeSalesMonth.combine();

        // 상권배후지 구별 정보
        ResultStoreHin resultStore = new ResultStoreHin();
        resultStore.combine();

    }
}