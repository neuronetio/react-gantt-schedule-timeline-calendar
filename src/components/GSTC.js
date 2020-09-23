import React, { useCallback, useEffect, useRef } from 'react';
import GSTC from 'gantt-schedule-timeline-calendar';
import 'gantt-schedule-timeline-calendar/dist/style.css';

export { GSTC };
export default function GSTCWrapper({ config, onLoad }) {
  let gstc = useRef(null);
  let mounted = useRef(false);

  const callback = useCallback(
    (node) => {
      if (node && !mounted.current) {
        node.addEventListener('gstc-loaded', () => {
          onLoad(gstc.current);
        });
        gstc.current = GSTC({
          element: node,
          state: config.current
            ? GSTC.api.stateFromConfig(config.current)
            : GSTC.api.stateFromConfig(config),
        });
        mounted.current = true;
      }
    },
    [config, onLoad]
  );

  useEffect(() => {
    return () => {
      if (gstc.current) {
        gstc.current.app.destroy();
      }
    };
  });

  return <div className="gstc-wrapper" ref={callback} />;
}
