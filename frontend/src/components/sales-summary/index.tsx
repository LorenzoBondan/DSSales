
import SalesSummaryCard from './sales-summary-card';
import {ReactComponent as Icon1} from '../../assets/images/icone-1.svg';
import {ReactComponent as Icon2} from '../../assets/images/icone-2.svg';
import {ReactComponent as Icon3} from '../../assets/images/icone-3.svg';
import {ReactComponent as Icon4} from '../../assets/images/icone-4.svg';

import './styles.css';
import { FilterData, SalesSummaryData } from '../../types';
import { useEffect, useMemo, useState } from 'react';
import { buildFilterParams, makeRequest } from '../../utils/request';

type Props = {
    filterData? : FilterData;
}

const initialSummary = {
    avg: 0,
    min: 0,
    max: 0,
    count: 0,
}

const SalesSummary = ({filterData} : Props) => {

    const [summary, setSummary] = useState<SalesSummaryData>(initialSummary);

  // corrigindo bug das requisições infinitas
  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesSummaryData>('/sales/summary', {params})
      .then(response => {
        setSummary(response.data);
    })
    .catch(() => {
        console.log('Error to fetch sales by date');
    });
  }, [params])

    return(

        <div className="sales-summary-container">
            <SalesSummaryCard value={parseFloat(summary?.avg?.toFixed(2))} label="Média" icon={<Icon1/>}/>
            <SalesSummaryCard value={summary?.count} label="Quantidade" icon={<Icon3/>}/>
            <SalesSummaryCard value={summary?.min} label="Mínima" icon={<Icon2/>}/>
            <SalesSummaryCard value={summary?.max} label="Máxima" icon={<Icon4/>}/>
        </div>
    );
}

export default SalesSummary;