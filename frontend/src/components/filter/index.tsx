import FlatPicker from 'react-flatpickr';
import "flatpickr/dist/themes/material_green.css";
import flatpickr from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt'; 
import './styles.css';
import { useState } from 'react';
import { FilterData, Gender } from '../../types';

flatpickr.localize(Portuguese);

/* props para mudar a data selecionada e consquentemente os dados dos gráficos */
type Props = {
    onFilterChange: (filter : FilterData) => void;
}


const Filter = ( {onFilterChange} : Props ) => {
    
    //estado pra pegar as datas selecionadas
    const [dates, setDates] = useState<Date[]>([]);

    const [gender, setGender] = useState<Gender>();

    const onChangeDate = (dates: Date[]) => {
        if (dates.length === 2 ){ // se já selecionou data final e inicial
            setDates(dates);
            onFilterChange( {dates, gender} );
        }
    };

    const onChangeGender = (event : React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGender = event.target.value as Gender;

        setGender(selectedGender);
        onFilterChange( {dates, gender: selectedGender} );
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

            <select className='filter-input' value={gender} onChange={onChangeGender}>
                <option value="">Selecione um gênero</option>
                <option value="MALE">Masculino</option>
                <option value="FEMALE">Feminino</option>
                <option value="OTHER">Outro</option>
            </select>
        </div>
    );
}

export default Filter;