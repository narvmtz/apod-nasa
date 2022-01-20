import { format } from 'date-fns';
import './fetchData.css';

const DatePicker = ({ changeHandler, dateFormat, futureDate }) => {
  return (
    <form className="date-picker">
      <label>
        Select date:
        <input
          type="date"
          max={format(new Date(), dateFormat)}
          name="futureDate"
          value={futureDate}
          onChange={(e) => changeHandler(e)}
        />
      </label>
    </form>
  );
};

export default DatePicker;
