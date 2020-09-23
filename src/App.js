// App.js
import React, { useEffect, useRef } from 'react';
import GSTCComponent, { GSTC } from './components/GSTC';

function App() {
  const GSTCID = GSTC.api.GSTCID;
  let config = useRef({
    licenseKey:
      '====BEGIN LICENSE KEY====\nXOfH/lnVASM6et4Co473t9jPIvhmQ/l0X3Ewog30VudX6GVkOB0n3oDx42NtADJ8HjYrhfXKSNu5EMRb5KzCLvMt/pu7xugjbvpyI1glE7Ha6E5VZwRpb4AC8T1KBF67FKAgaI7YFeOtPFROSCKrW5la38jbE5fo+q2N6wAfEti8la2ie6/7U2V+SdJPqkm/mLY/JBHdvDHoUduwe4zgqBUYLTNUgX6aKdlhpZPuHfj2SMeB/tcTJfH48rN1mgGkNkAT9ovROwI7ReLrdlHrHmJ1UwZZnAfxAC3ftIjgTEHsd/f+JrjW6t+kL6Ef1tT1eQ2DPFLJlhluTD91AsZMUg==||U2FsdGVkX1/SWWqU9YmxtM0T6Nm5mClKwqTaoF9wgZd9rNw2xs4hnY8Ilv8DZtFyNt92xym3eB6WA605N5llLm0D68EQtU9ci1rTEDopZ1ODzcqtTVSoFEloNPFSfW6LTIC9+2LSVBeeHXoLEQiLYHWihHu10Xll3KsH9iBObDACDm1PT7IV4uWvNpNeuKJc\npY3C5SG+3sHRX1aeMnHlKLhaIsOdw2IexjvMqocVpfRpX4wnsabNA0VJ3k95zUPS3vTtSegeDhwbl6j+/FZcGk9i+gAy6LuetlKuARjPYn2LH5Be3Ah+ggSBPlxf3JW9rtWNdUoFByHTcFlhzlU9HnpnBUrgcVMhCQ7SAjN9h2NMGmCr10Rn4OE0WtelNqYVig7KmENaPvFT+k2I0cYZ4KWwxxsQNKbjEAxJxrzK4HkaczCvyQbzj4Ppxx/0q+Cns44OeyWcwYD/vSaJm4Kptwpr+L4y5BoSO/WeqhSUQQ85nvOhtE0pSH/ZXYo3pqjPdQRfNm6NFeBl2lwTmZUEuw==\n====END LICENSE KEY====',
    list: {
      rows: {
        [GSTCID('1')]: {
          id: GSTCID('1'),
          label: 'Row 1',
        },
        [GSTCID('2')]: {
          id: GSTCID('2'),
          label: 'Row 2',
        },
        [GSTCID('3')]: {
          id: GSTCID('3'),
          label: 'Row 3',
        },
        [GSTCID('4')]: {
          id: GSTCID('4'),
          label: 'Row 4',
        },
      },
      columns: {
        data: {
          [GSTCID('id')]: {
            id: GSTCID('id'),
            data: ({ row }) => GSTC.api.sourceID(row.id),
            width: 50,
            header: {
              content: 'ID',
            },
          },
          [GSTCID('label')]: {
            id: GSTCID('label'),
            data: 'label',
            width: 200,
            header: {
              content: 'Label',
            },
          },
        },
      },
    },
    chart: {
      items: {
        [GSTCID('1')]: {
          id: GSTCID('1'),
          rowId: GSTCID('1'),
          label: 'Item 1',
          time: {
            start: GSTC.api.date().startOf('day').valueOf(),
            end: GSTC.api.date().add(1, 'day').endOf('day').valueOf(),
          },
        },
        [GSTCID('2')]: {
          id: GSTCID('2'),
          rowId: GSTCID('2'),
          label: 'Item 2',
          time: {
            start: GSTC.api.date().add(4, 'day').startOf('day').valueOf(),
            end: GSTC.api.date().add(5, 'day').endOf('day').valueOf(),
          },
        },
        [GSTCID('3')]: {
          id: GSTCID('3'),
          rowId: GSTCID('2'),
          label: 'Item 3',
          time: {
            start: GSTC.api.date().add(6, 'day').startOf('day').valueOf(),
            end: GSTC.api.date().add(7, 'day').endOf('day').valueOf(),
          },
        },
        [GSTCID('4')]: {
          id: GSTCID('4'),
          rowId: GSTCID('3'),
          label: 'Item 4',
          time: {
            start: GSTC.api.date().add(10, 'day').startOf('day').valueOf(),
            end: GSTC.api.date().add(12, 'day').endOf('day').valueOf(),
          },
        },
        [GSTCID('5')]: {
          id: GSTCID('5'),
          rowId: GSTCID('4'),
          label: 'Item 5',
          time: {
            start: GSTC.api.date().add(12, 'day').startOf('day').valueOf(),
            end: GSTC.api.date().add(14, 'day').endOf('day').valueOf(),
          },
        },
      },
    },
  });

  let subs = [];

  function onLoad(gstc) {
    gstc.state.update('config.chart.items.' + GSTCID('1'), (item1) => {
      item1.label = 'Gantt schedule timeline calendar';
      item1.time.end = GSTC.api.date(item1.time.end).add(4, 'day').valueOf();
      return item1;
    });
    subs.push(
      gstc.state.subscribe('config.chart.items', (items) => {
        console.log('items changed', items);
      })
    );
    subs.push(
      gstc.state.subscribe('config.list.rows', (rows) => {
        console.log('rows changed', rows);
      })
    );
    setTimeout(() => {
      gstc.state.update('config.list.rows.' + GSTCID('1'), (row) => {
        row.label = 'label changed dynamically';
        return row;
      });
    }, 2000);
  }

  useEffect(() => {
    return () => {
      subs.forEach((unsub) => unsub());
    };
  });

  return (
    <div className="App">
      <GSTCComponent config={config} onLoad={onLoad} />
    </div>
  );
}

export default App;
