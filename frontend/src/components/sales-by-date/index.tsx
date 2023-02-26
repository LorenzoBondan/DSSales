
import './styles.css';
import ReactApexChart from 'react-apexcharts';
import { buildChartSeries, chartOptions, sumSalesByDate } from './helpers';
import { useEffect, useMemo, useState } from 'react';
import { buildFilterParams, makeRequest } from '../../utils/request';
import { ChartSeriesData, FilterData, SalesByDate } from '../../types';
import { formatDate, formatPrice } from '../../utils/formatters';

type Props = {
    filterData? : FilterData;
}

const SalesByDateComponent = ({filterData} : Props) => {

  const [chartSeries, setchartSeries] = useState<ChartSeriesData[]>([]);

  const [ totalSum, setTotalSum] = useState(0);

  // corrigindo bug das requisições infinitas
    const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesByDate[]>('/sales/by-date', {params})
      .then(response => {
        const newChartSeries = buildChartSeries(response.data);
        setchartSeries(newChartSeries);

        const newTotalSum = sumSalesByDate(response.data);
        setTotalSum(newTotalSum);
    })
    .catch(() => {
        console.log('Error to fetch sales by date');
    });
  }, [params])

    return(
        <div className='base-card sales-by-date-container'>
            <div>
                <h4 className='sales-by-date-title'>Evolução das vendas</h4>
                
                {filterData?.dates && (
                    <span className='sales-by-date-period'>
                        {formatDate(filterData?.dates?.[0])} até {formatDate(filterData?.dates?.[1])}
                    </span>
                )}
            </div>

            <div className='sales-by-date-data'>
                <div className='sales-by-date-quantity-container'>
                    <h2>{formatPrice(totalSum)}</h2>
                    <span className='sales-by-date-quantity-label'>Vendas no período</span>
                    <span className='sales-by-date-quantity-description'>O gráfico mostra as vendas em todas as lojas</span>
                </div>

                <div className='sales-by-date-chart'>
                    <ReactApexChart 
                        options={chartOptions} // arquivo com as configurações (helpers.ts)
                        series={[{ name: 'Vendas', data: chartSeries }]} 
                        type='bar'
                        height={240}
                        width="100%"
                    />
                </div>
            </div>
        </div>
    );
}

export default SalesByDateComponent;