//External Lib Import
import React from 'react';
import Moment from 'react-moment';

const DateFormatter = (date) => {
  return (
    <>
      <Moment format="D MMM YYYY" withTitle>
        {date}
      </Moment>{' '}
      <br />
    </>
  );
};

export const fromNow = (data) => <Moment fromNow>{data}</Moment>;

export function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export default DateFormatter;
