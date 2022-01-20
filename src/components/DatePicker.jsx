import { format } from 'date-fns';
import './fetchData.css';

const DatePicker = ({ changeHandler, dateFormat, futureDate }) => {
  return (
    <>
      <p style={{ padding: '0 1rem' }}>
        Hey space-lover 👋! Check out the previous 7 pictures (with
        descriptions!) from APOD NASA's API by selecting a date!
      </p>
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
    </>
  );
};

export default DatePicker;
