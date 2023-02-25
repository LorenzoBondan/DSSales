
import './styles.css';
import ReactApexChart from 'react-apexcharts';
import { chartOptions } from './helpers';

const initialData = [
    {
        x: '2020-01-01',
        y: 54
    },

    {
        x: '2020-01-02',
        y: 66
    },
    {
        x: '2020-01-03',
        y: 54
    },

    {
        x: '2020-01-04',
        y: 10
    },
];

const SalesByDate = () => {
    return(
        <div className='base-card sales-by-date-container'>
            <div>
                <h4 className='sales-by-date-title'>Evolução das vendas</h4>
                <span className='sales-by-date-period'>01/01/2017 a 31/01/2017</span>
            </div>

            <div className='sales-by-date-data'>
                <div className='sales-by-date-quantity-container'>
                    <h2>464.988,00</h2>
                    <span className='sales-by-date-quantity-label'>Vendas no período</span>
                    <span className='sales-by-date-quantity-description'>O gráfico mostra as vendas em todas as lojas</span>
                </div>

                <div className='sales-by-date-chart'>
                    <ReactApexChart 
                        options={chartOptions} // arquivo com as configurações (helpers.ts)
                        series={[{ name: 'Vendas', data: initialData }]} 
                        type='bar'
                        height={240}
                        width="100%"
                    />
                </div>
            </div>
        </div>
    );
}

export default SalesByDate;