
import SalesSummaryCard from './sales-summary-card';
import {ReactComponent as Icon1} from '../../assets/images/icone-1.svg';
import {ReactComponent as Icon2} from '../../assets/images/icone-2.svg';
import {ReactComponent as Icon3} from '../../assets/images/icone-3.svg';
import {ReactComponent as Icon4} from '../../assets/images/icone-4.svg';

import './styles.css';

const SalesSummary = () => {
    return(
        <div className="sales-summary-container">
            <SalesSummaryCard value={430} label="Média" icon={<Icon1/>}/>
            <SalesSummaryCard value={1500} label="Quantidade" icon={<Icon3/>}/>
            <SalesSummaryCard value={120} label="Mínima" icon={<Icon2/>}/>
            <SalesSummaryCard value={500} label="Máxima" icon={<Icon4/>}/>
        </div>
    );
}

export default SalesSummary;