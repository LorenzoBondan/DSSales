import FlatPicker from 'react-flatpickr';
import "flatpickr/dist/themes/material_green.css";
import flatpickr from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt'; 
import './styles.css';

flatpickr.localize(Portuguese);

const Filter = () => {
    
    const onChangeDate = (dates: Date[]) => {
        console.log(dates);
    };

    return(
        <div className="base-card filter-main-container">
            <FlatPicker
                className='filter-input'
                onChange={onChangeDate}
                placeholder='Selecione o período'
                options={{
                    mode: 'range', // período de datas
                    dateFormat: 'd/m/Y',
                    showMonths: 2
                }}
            />

            <select className='filter-input'>
                <option value="">Selecione um gênero</option>
                <option value="MALE">Masculino</option>
                <option value="FEMALE">Feminino</option>
                <option value="OTHER">Outro</option>
            </select>
        </div>
    );
}

export default Filter;