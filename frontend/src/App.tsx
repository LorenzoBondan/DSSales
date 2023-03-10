import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Filter from "./components/filter";
import Header from "./components/header";
import PieChartCard from "./components/pie-chart-card";
import SalesByDateComponent from "./components/sales-by-date";
import SalesSummary from "./components/sales-summary";
import SalesTable from "./components/sales-table";
import { buildSalesByPaymentMethodChart, buildSalesByStoreChart } from "./helpers";
import { FilterData, PieChartConfig, SalesByPaymentMethod, SalesByStore } from "./types";
import { buildFilterParams, makeRequest } from "./utils/request";

function App() {

  const [filterData, setFilterData] = useState<FilterData>();
  
  const [salesByStore, setSalesByStore] = useState<PieChartConfig>();
  const [salesByPaymentMethod, setSalesByPaymentMethod] = useState<PieChartConfig>();

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter);
  }

  /* gráficos pizza */

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  // gráfico de lojas
  useEffect(() => {
    makeRequest
      .get<SalesByStore[]>('/sales/by-store', {params})
      .then(response => {
        const newSalesByStore = buildSalesByStoreChart(response.data);
        setSalesByStore(newSalesByStore);

    })
    .catch(() => {
        console.log('Error to fetch sales by store');
    });
  }, [params])

  // gráfico de pagamento
  useEffect(() => {
    makeRequest
      .get<SalesByPaymentMethod[]>('/sales/by-payment-method', {params})
      .then(response => {
        const newSalesByPaymentMethod = buildSalesByPaymentMethodChart(response.data);
        setSalesByPaymentMethod(newSalesByPaymentMethod);

    })
    .catch(() => {
        console.log('Error to fetch sales by payment method');
    });
  }, [params])

  return (
    <>
      <Header/>

      <div className="app-container">
        <Filter onFilterChange={onFilterChange}/>
        <SalesByDateComponent filterData={filterData}/>
        <div className="sales-overview-container">
          <SalesSummary filterData={filterData}/>
          <PieChartCard 
            name="Lojas" 
            labels={salesByStore?.labels || []} 
            series={salesByStore?.series || []}
          />
          
          <PieChartCard 
            name="Pagamento" 
            labels={salesByPaymentMethod?.labels || []} 
            series={salesByPaymentMethod?.series || []}
          />
        </div>

        <SalesTable filterData={filterData}/>
        
      </div>
    </>
  );
}

export default App;
