<p align="center">
  <img src="https://neuronet.io/screenshots/gstc9-flat-bgw-300.png" alt="logo">
</p>
<hr />
<h1 align="center">react-gantt-schedule-timeline-calendar</h1>

React version of [gantt-schedule-timeline-calendar](https://github.com/neuronetio/gantt-schedule-timeline-calendar)

Documentation can be found on original component page at [gantt-schedule-timeline-calendar](https://github.com/neuronetio/gantt-schedule-timeline-calendar)

<p align="center">
  <img src="https://neuronet.io/screenshots/appscrn.png?uniq=1" alt="gstc-logo">
</p>

## installation

`npm i react-gantt-schedule-timeline-calendar`

## usage

```javascript
import React, { useEffect } from "react";
import GSTC from "./react-gantt-schedule-timeline-calendar";

function App() {
  const config = {
    height: 300,
    list: {
      rows: {
        "1": {
          id: "1",
          label: "Row 1"
        },
        "2": {
          id: "2",
          label: "Row 2"
        },
        "3": {
          id: "3",
          label: "Row 3"
        },
        "4": {
          id: "4",
          label: "Row 4"
        }
      },
      columns: {
        data: {
          id: {
            id: "id",
            data: "id",
            width: 50,
            header: {
              content: "ID"
            }
          },
          label: {
            id: "label",
            data: "label",
            width: 200,
            header: {
              content: "Label"
            }
          }
        }
      }
    },
    chart: {
      items: {
        "1": {
          id: "1",
          rowId: "1",
          label: "Item 1",
          time: {
            start: new Date().getTime(),
            end: new Date().getTime() + 24 * 60 * 60 * 1000
          }
        },
        "2": {
          id: "2",
          rowId: "2",
          label: "Item 2",
          time: {
            start: new Date().getTime() + 4 * 24 * 60 * 60 * 1000,
            end: new Date().getTime() + 5 * 24 * 60 * 60 * 1000
          }
        },
        "3": {
          id: "3",
          rowId: "2",
          label: "Item 3",
          time: {
            start: new Date().getTime() + 6 * 24 * 60 * 60 * 1000,
            end: new Date().getTime() + 7 * 24 * 60 * 60 * 1000
          }
        },
        "4": {
          id: "4",
          rowId: "3",
          label: "Item 4",
          time: {
            start: new Date().getTime() + 10 * 24 * 60 * 60 * 1000,
            end: new Date().getTime() + 12 * 24 * 60 * 60 * 1000
          }
        },
        "5": {
          id: "5",
          rowId: "4",
          label: "Item 5",
          time: {
            start: new Date().getTime() + 12 * 24 * 60 * 60 * 1000,
            end: new Date().getTime() + 14 * 24 * 60 * 60 * 1000
          }
        }
      }
    }
  };

  let subs = [];

  function onState(state) {
    state.update("config.chart.items.1", item1 => {
      item1.label = "Gantt schedule timeline calendar";
      item1.time.end = item1.time.end + 2 * 24 * 60 * 60 * 1000;
      return item1;
    });
    subs.push(
      state.subscribe("config.chart.items", items => {
        console.log("items changed", items);
      })
    );
    subs.push(
      state.subscribe("config.list.rows", rows => {
        console.log("rows changed", rows);
      })
    );
  }

  useEffect(() => {
    return () => {
      subs.forEach(unsub => unsub());
    };
  });

  return (
    <div className="App">
      <GSTC config={config} onState={onState} />
    </div>
  );
}

export default App;
```

## license

AGPL-3.0 (for non AGPL-3.0 projects you must buy commercial license - contact me at neuronet.io@gmail.com)
