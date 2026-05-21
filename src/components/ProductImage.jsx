const SIZES = { sm: 80, md: 160, lg: 280 };

// Color palette
const C = {
  body: '#D4CFC8',
  dark: '#2A2520',
  secondary: '#B8B2A8',
  panel: '#1F1B16',
  screen: '#3B7BDC',
  led_green: '#2D8C4F',
  led_red: '#C0392B',
  led_yellow: '#D4A017',
  white: '#FFFFFF',
  light: '#EDEAE4',
};

const SVG_MAP = {
  // id:1 — Industrial PLC Control Panel
  1: (
    <g>
      {/* Cabinet outer body */}
      <rect x="32" y="18" width="96" height="124" rx="1" fill={C.body} stroke={C.dark} strokeWidth="1.5" />
      {/* Cabinet shadow/depth */}
      <rect x="34" y="20" width="92" height="120" rx="1" fill={C.light} stroke="none" />
      {/* Top panel edge */}
      <rect x="32" y="18" width="96" height="8" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      {/* Bottom panel edge */}
      <rect x="32" y="130" width="96" height="12" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      {/* Door handle */}
      <rect x="73" y="68" width="5" height="24" rx="2" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      {/* DIN rail */}
      <rect x="40" y="72" width="80" height="5" rx="0" fill={C.dark} stroke={C.dark} strokeWidth="1" />
      <rect x="40" y="73" width="80" height="2" fill="#4A453E" />
      {/* PLC CPU module - left */}
      <rect x="42" y="42" width="28" height="26" rx="1" fill={C.panel} stroke={C.dark} strokeWidth="1" />
      <rect x="44" y="44" width="20" height="12" fill={C.screen} rx="1" />
      {/* CPU status LEDs */}
      <circle cx="47" cy="60" r="2" fill={C.led_green} />
      <circle cx="53" cy="60" r="2" fill={C.led_green} />
      <circle cx="59" cy="60" r="2" fill={C.led_yellow} />
      {/* I/O module block 1 */}
      <rect x="76" y="42" width="14" height="26" rx="1" fill={C.body} stroke={C.dark} strokeWidth="1" />
      {[44, 48, 52, 56, 60, 64].map((y, i) => (
        <rect key={i} x="78" y={y} width="10" height="2.5" rx="0.5" fill={C.secondary} stroke={C.dark} strokeWidth="0.5" />
      ))}
      {/* I/O module block 2 */}
      <rect x="94" y="42" width="14" height="26" rx="1" fill={C.body} stroke={C.dark} strokeWidth="1" />
      {[44, 48, 52, 56, 60, 64].map((y, i) => (
        <rect key={i} x="96" y={y} width="10" height="2.5" rx="0.5" fill={C.secondary} stroke={C.dark} strokeWidth="0.5" />
      ))}
      {/* Terminal strip */}
      <rect x="40" y="100" width="80" height="20" fill={C.light} stroke={C.dark} strokeWidth="1" />
      {[42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108].map((x, i) => (
        <line key={i} x1={x} y1="100" x2={x} y2="120" stroke={C.secondary} strokeWidth="1" />
      ))}
      {[46, 52, 58, 64, 70, 76, 82, 88, 94, 100, 106].map((x, i) => (
        <circle key={i} cx={x} cy="110" r="2" fill={C.dark} />
      ))}
      {/* Label plate */}
      <rect x="50" y="126" width="60" height="8" fill={C.white} stroke={C.secondary} strokeWidth="0.75" />
      <line x1="54" y1="129" x2="106" y2="129" stroke={C.secondary} strokeWidth="0.5" />
      <line x1="54" y1="131.5" x2="106" y2="131.5" stroke={C.secondary} strokeWidth="0.5" />
    </g>
  ),

  // id:2 — 10" Color Touch HMI
  2: (
    <g>
      {/* Bezel outer */}
      <rect x="22" y="28" width="116" height="104" rx="3" fill={C.body} stroke={C.dark} strokeWidth="1.5" />
      {/* Inner bezel */}
      <rect x="26" y="32" width="108" height="92" rx="2" fill={C.panel} stroke={C.dark} strokeWidth="1" />
      {/* Screen */}
      <rect x="30" y="36" width="100" height="80" rx="1" fill={C.screen} />
      {/* Screen glare */}
      <rect x="30" y="36" width="30" height="80" fill="rgba(255,255,255,0.04)" />
      {/* Screen content lines */}
      <rect x="36" y="44" width="60" height="4" rx="1" fill="rgba(255,255,255,0.3)" />
      <rect x="36" y="52" width="88" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="36" y="58" width="75" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
      {/* Trend line on screen */}
      <polyline points="36,90 50,82 64,86 78,70 92,76 110,64" fill="none" stroke="#5DADE2" strokeWidth="1.5" />
      <polyline points="36,96 50,94 64,90 78,88 92,84 110,78" fill="none" stroke="#27AE60" strokeWidth="1" />
      {/* Mounting tabs top */}
      <rect x="44" y="22" width="16" height="8" rx="1" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <circle cx="52" cy="26" r="2.5" fill={C.panel} />
      <rect x="100" y="22" width="16" height="8" rx="1" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <circle cx="108" cy="26" r="2.5" fill={C.panel} />
      {/* Mounting tabs bottom */}
      <rect x="44" y="130" width="16" height="8" rx="1" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <circle cx="52" cy="134" r="2.5" fill={C.panel} />
      <rect x="100" y="130" width="16" height="8" rx="1" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <circle cx="108" cy="134" r="2.5" fill={C.panel} />
      {/* Status LED */}
      <circle cx="123" cy="100" r="3" fill={C.led_green} />
      {/* Power button */}
      <circle cx="123" cy="112" r="4" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <circle cx="123" cy="112" r="2" fill={C.panel} />
    </g>
  ),

  // id:3 — Variable Frequency Drive (VFD)
  3: (
    <g>
      {/* Main body */}
      <rect x="40" y="14" width="80" height="132" rx="2" fill={C.body} stroke={C.dark} strokeWidth="1.5" />
      {/* Heat sink fins at top */}
      {[16, 20, 24, 28, 32, 36, 40, 44, 48].map((y, i) => (
        <line key={i} x1="40" y1={y} x2="120" y2={y} stroke={C.secondary} strokeWidth="1" />
      ))}
      <rect x="40" y="14" width="80" height="38" rx="2" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      {[17, 21, 25, 29, 33, 37, 41, 45, 49].map((y, i) => (
        <line key={i} x1="42" y1={y} x2="118" y2={y} stroke={C.dark} strokeWidth="0.5" />
      ))}
      {/* Display panel */}
      <rect x="48" y="56" width="64" height="24" rx="1" fill={C.panel} stroke={C.dark} strokeWidth="1" />
      <rect x="51" y="59" width="44" height="18" rx="0.5" fill="#1a2a3a" />
      {/* Display text — Hz */}
      <text x="73" y="72" fontFamily="monospace" fontSize="10" fill="#00E5FF" textAnchor="middle" fontWeight="bold">50.0 Hz</text>
      {/* Keypad buttons */}
      {[
        [50, 86], [65, 86], [80, 86], [95, 86], [110, 86],
        [50, 98], [65, 98], [80, 98], [95, 98], [110, 98],
        [57, 110], [80, 110], [103, 110],
      ].map(([x, y], i) => (
        <rect key={i} x={x - 5} y={y - 4} width="10" height="7" rx="1" fill={C.secondary} stroke={C.dark} strokeWidth="0.75" />
      ))}
      {/* Terminal cover bottom */}
      <rect x="40" y="122" width="80" height="24" rx="0" fill={C.panel} stroke={C.dark} strokeWidth="1" />
      <line x1="40" y1="126" x2="120" y2="126" stroke={C.secondary} strokeWidth="0.5" />
      {/* Terminal screws */}
      {[50, 60, 70, 80, 90, 100, 110].map((x, i) => (
        <circle key={i} cx={x} cy="133" r="2.5" fill={C.body} stroke={C.dark} strokeWidth="0.75" />
      ))}
      {/* DIN rail clip */}
      <rect x="52" y="140" width="56" height="6" rx="1" fill={C.dark} stroke={C.dark} strokeWidth="1" />
    </g>
  ),

  // id:4 — Photoelectric Sensor (12-pack)
  4: (
    <g>
      {/* Sensor 1 (back) */}
      <ellipse cx="72" cy="100" rx="11" ry="11" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <rect x="61" y="56" width="22" height="44" rx="11" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      {/* Sensor 2 (middle) */}
      <ellipse cx="85" cy="94" rx="11" ry="11" fill={C.body} stroke={C.dark} strokeWidth="1" />
      <rect x="74" y="50" width="22" height="44" rx="11" fill={C.body} stroke={C.dark} strokeWidth="1" />
      {/* Sensor 3 (front) */}
      <ellipse cx="98" cy="88" rx="11" ry="11" fill={C.light} stroke={C.dark} strokeWidth="1.5" />
      <rect x="87" y="44" width="22" height="44" rx="11" fill={C.light} stroke={C.dark} strokeWidth="1.5" />
      {/* Thread marks on front sensor */}
      {[48, 53, 58, 63, 68, 73, 78].map((y, i) => (
        <line key={i} x1="87" y1={y} x2="109" y2={y} stroke={C.secondary} strokeWidth="0.75" />
      ))}
      {/* Sensing face on front sensor */}
      <ellipse cx="98" cy="88" rx="8" ry="8" fill="#B0C4DE" stroke={C.dark} strokeWidth="1" />
      <ellipse cx="98" cy="88" rx="5" ry="5" fill={C.screen} stroke={C.dark} strokeWidth="0.75" />
      <ellipse cx="98" cy="88" rx="2" ry="2" fill="rgba(255,255,255,0.6)" />
      {/* M12 connector on back */}
      <rect x="90" y="30" width="16" height="14" rx="3" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <line x1="96" y1="44" x2="96" y2="44" stroke={C.dark} strokeWidth="1" />
      {/* 4 pin holes */}
      {[[94,34],[102,34],[94,40],[102,40]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.5" fill={C.dark} />
      ))}
      {/* Flat side indicator */}
      <line x1="109" y1="50" x2="109" y2="82" stroke={C.dark} strokeWidth="1.5" />
      {/* LED status on front sensor */}
      <circle cx="90" cy="46" r="2.5" fill={C.led_yellow} stroke={C.dark} strokeWidth="0.5" />
      <circle cx="106" cy="46" r="2.5" fill={C.led_green} stroke={C.dark} strokeWidth="0.5" />
    </g>
  ),

  // id:5 — Servo Motor & Drive Kit
  5: (
    <g>
      {/* Motor body (cylinder side view) */}
      <rect x="42" y="52" width="72" height="56" rx="6" fill={C.body} stroke={C.dark} strokeWidth="1.5" />
      {/* Winding/ventilation lines */}
      {[62, 72, 82, 92, 102].map((x, i) => (
        <line key={i} x1={x} y1="52" x2={x} y2="108" stroke={C.secondary} strokeWidth="1" />
      ))}
      {/* Front mounting flange */}
      <rect x="110" y="44" width="20" height="72" rx="2" fill={C.secondary} stroke={C.dark} strokeWidth="1.5" />
      {/* Flange bolt holes */}
      <circle cx="120" cy="52" r="3.5" fill={C.white} stroke={C.dark} strokeWidth="1" />
      <circle cx="120" cy="108" r="3.5" fill={C.white} stroke={C.dark} strokeWidth="1" />
      <circle cx="114" cy="80" r="3" fill={C.white} stroke={C.dark} strokeWidth="0.75" />
      <circle cx="126" cy="80" r="3" fill={C.white} stroke={C.dark} strokeWidth="0.75" />
      {/* Shaft */}
      <rect x="128" y="74" width="16" height="12" rx="2" fill={C.secondary} stroke={C.dark} strokeWidth="1.5" />
      <line x1="140" y1="74" x2="144" y2="74" stroke={C.dark} strokeWidth="1" />
      <line x1="140" y1="86" x2="144" y2="86" stroke={C.dark} strokeWidth="1" />
      {/* Encoder housing on back */}
      <rect x="24" y="58" width="20" height="44" rx="4" fill={C.panel} stroke={C.dark} strokeWidth="1.5" />
      {/* Encoder connector */}
      <rect x="18" y="70" width="8" height="20" rx="2" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      {/* Encoder label */}
      <circle cx="34" cy="80" r="8" fill="#2A2520" stroke={C.secondary} strokeWidth="0.75" />
      <circle cx="34" cy="80" r="5" fill="#3d3830" />
      {/* Motor nameplate */}
      <rect x="52" y="72" width="48" height="16" rx="1" fill={C.white} stroke={C.secondary} strokeWidth="0.75" />
      <line x1="56" y1="76" x2="96" y2="76" stroke={C.secondary} strokeWidth="0.5" />
      <line x1="56" y1="80" x2="96" y2="80" stroke={C.secondary} strokeWidth="0.5" />
      <line x1="56" y1="84" x2="96" y2="84" stroke={C.secondary} strokeWidth="0.5" />
    </g>
  ),

  // id:6 — Industrial IoT Gateway
  6: (
    <g>
      {/* Main body */}
      <rect x="36" y="36" width="88" height="88" rx="3" fill={C.body} stroke={C.dark} strokeWidth="1.5" />
      {/* Top panel */}
      <rect x="36" y="36" width="88" height="12" rx="3" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      {/* SMA antenna connectors */}
      <rect x="54" y="24" width="8" height="14" rx="2" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <circle cx="58" cy="24" r="3.5" fill={C.panel} stroke={C.dark} strokeWidth="1" />
      <rect x="98" y="24" width="8" height="14" rx="2" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <circle cx="102" cy="24" r="3.5" fill={C.panel} stroke={C.dark} strokeWidth="1" />
      {/* Front face panel */}
      <rect x="42" y="52" width="76" height="64" rx="1" fill={C.panel} stroke={C.dark} strokeWidth="1" />
      {/* Status LEDs row */}
      {[
        [58, C.led_green],
        [70, C.led_green],
        [82, C.led_yellow],
        [94, C.led_red],
        [106, C.led_green],
      ].map(([cx, color], i) => (
        <g key={i}>
          <circle cx={cx} cy="62" r="3.5" fill={color} />
          <rect x={cx - 4} y="66" width="8" height="2" rx="0.5" fill={C.secondary} />
        </g>
      ))}
      {/* Ethernet ports (2x) */}
      <rect x="50" y="74" width="18" height="12" rx="1" fill="#0a1a2a" stroke={C.secondary} strokeWidth="1" />
      <rect x="52" y="76" width="14" height="8" rx="0.5" fill="#1a3050" />
      {[54, 58, 62].map((x, i) => (
        <line key={i} x1={x} y1="76" x2={x} y2="84" stroke="#3B7BDC" strokeWidth="0.75" />
      ))}
      <rect x="72" y="74" width="18" height="12" rx="1" fill="#0a1a2a" stroke={C.secondary} strokeWidth="1" />
      <rect x="74" y="76" width="14" height="8" rx="0.5" fill="#1a3050" />
      {[76, 80, 84].map((x, i) => (
        <line key={i} x1={x} y1="76" x2={x} y2="84" stroke="#3B7BDC" strokeWidth="0.75" />
      ))}
      {/* USB port */}
      <rect x="96" y="76" width="14" height="10" rx="1" fill="#0a1a2a" stroke={C.secondary} strokeWidth="1" />
      <rect x="98" y="78" width="10" height="6" rx="0.5" fill="#222" />
      {/* Model label */}
      <rect x="50" y="92" width="60" height="16" rx="1" fill="#2A2520" />
      <line x1="54" y1="97" x2="106" y2="97" stroke={C.secondary} strokeWidth="0.5" />
      <line x1="54" y1="101" x2="106" y2="101" stroke={C.secondary} strokeWidth="0.5" />
      <line x1="54" y1="105" x2="90" y2="105" stroke={C.secondary} strokeWidth="0.5" />
      {/* DIN rail clip bottom */}
      <rect x="52" y="120" width="56" height="8" rx="1" fill={C.dark} stroke={C.dark} strokeWidth="1" />
      <rect x="56" y="118" width="8" height="12" rx="1" fill={C.secondary} stroke={C.dark} strokeWidth="0.75" />
      <rect x="96" y="118" width="8" height="12" rx="1" fill={C.secondary} stroke={C.dark} strokeWidth="0.75" />
    </g>
  ),

  // id:7 — Industrial Ethernet Switch (8-port)
  7: (
    <g>
      {/* Main body — wide flat form factor */}
      <rect x="18" y="52" width="124" height="56" rx="3" fill={C.body} stroke={C.dark} strokeWidth="1.5" />
      {/* Top surface */}
      <rect x="18" y="52" width="124" height="10" rx="3" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      {/* DIN rail clips on bottom */}
      <rect x="30" y="102" width="16" height="10" rx="1" fill={C.dark} stroke={C.dark} strokeWidth="1" />
      <rect x="114" y="102" width="16" height="10" rx="1" fill={C.dark} stroke={C.dark} strokeWidth="1" />
      {/* Front panel */}
      <rect x="22" y="62" width="116" height="38" rx="1" fill={C.panel} stroke={C.dark} strokeWidth="1" />
      {/* 8 Ethernet ports */}
      {[28, 41, 54, 67, 80, 93, 106, 119].map((x, i) => (
        <g key={i}>
          {/* Port LED pair */}
          <circle cx={x + 4} cy="68" r="2" fill={i < 6 ? C.led_green : C.led_yellow} />
          <circle cx={x + 8} cy="68" r="2" fill={C.led_green} />
          {/* Port socket */}
          <rect x={x} y="72" width="12" height="10" rx="1" fill="#0a1a2a" stroke={C.secondary} strokeWidth="0.75" />
          <rect x={x + 1} y="73" width="10" height="8" rx="0.5" fill="#1a3050" />
          {[x+3, x+6, x+9].map((lx, j) => (
            <line key={j} x1={lx} y1="73" x2={lx} y2="81" stroke="#3B7BDC" strokeWidth="0.5" />
          ))}
        </g>
      ))}
      {/* Power indicator */}
      <circle cx="134" cy="74" r="4" fill={C.led_green} stroke={C.dark} strokeWidth="0.75" />
      {/* Power terminals on right side */}
      <rect x="136" y="84" width="6" height="10" rx="1" fill={C.secondary} stroke={C.dark} strokeWidth="0.75" />
      <circle cx="139" cy="89" r="2" fill={C.dark} />
      {/* Model label strip */}
      <rect x="26" y="88" width="52" height="8" rx="0.5" fill="#2A2520" />
      <line x1="28" y1="91" x2="76" y2="91" stroke={C.secondary} strokeWidth="0.4" />
      <line x1="28" y1="93.5" x2="76" y2="93.5" stroke={C.secondary} strokeWidth="0.4" />
    </g>
  ),

  // id:8 — Push Button Station (6-button NEMA 4X)
  8: (
    <g>
      {/* NEMA 4X enclosure — rounded corners */}
      <rect x="30" y="22" width="100" height="116" rx="8" fill={C.body} stroke={C.dark} strokeWidth="1.5" />
      {/* Cover ridge */}
      <rect x="34" y="26" width="92" height="108" rx="6" fill={C.light} stroke={C.secondary} strokeWidth="0.75" />
      {/* Green illuminated start button */}
      <circle cx="62" cy="56" r="14" fill="#1a6a2a" stroke={C.dark} strokeWidth="1.5" />
      <circle cx="62" cy="56" r="10" fill="#2D8C4F" stroke={C.dark} strokeWidth="1" />
      <circle cx="62" cy="56" r="6" fill="#4CAF50" />
      <circle cx="60" cy="54" r="2" fill="rgba(255,255,255,0.4)" />
      {/* START label */}
      <rect x="48" y="72" width="28" height="7" rx="1" fill={C.white} />
      <line x1="52" y1="75" x2="72" y2="75" stroke={C.secondary} strokeWidth="0.5" />
      {/* Red illuminated stop button */}
      <circle cx="98" cy="56" r="14" fill="#7a1a1a" stroke={C.dark} strokeWidth="1.5" />
      <circle cx="98" cy="56" r="10" fill={C.led_red} stroke={C.dark} strokeWidth="1" />
      <circle cx="98" cy="56" r="6" fill="#E74C3C" />
      <circle cx="96" cy="54" r="2" fill="rgba(255,255,255,0.4)" />
      {/* STOP label */}
      <rect x="84" y="72" width="28" height="7" rx="1" fill={C.white} />
      <line x1="88" y1="75" x2="108" y2="75" stroke={C.secondary} strokeWidth="0.5" />
      {/* Selector switch knob */}
      <circle cx="62" cy="100" r="11" fill={C.secondary} stroke={C.dark} strokeWidth="1.5" />
      <circle cx="62" cy="100" r="7" fill={C.panel} stroke={C.dark} strokeWidth="1" />
      <line x1="62" y1="93" x2="62" y2="100" stroke={C.white} strokeWidth="1.5" />
      {/* Pilot light */}
      <circle cx="98" cy="100" r="11" fill="#888" stroke={C.dark} strokeWidth="1.5" />
      <circle cx="98" cy="100" r="7" fill={C.led_yellow} />
      <circle cx="96" cy="98" r="2.5" fill="rgba(255,255,255,0.5)" />
      {/* Small button 1 */}
      <circle cx="62" cy="124" r="8" fill={C.secondary} stroke={C.dark} strokeWidth="1.5" />
      <circle cx="62" cy="124" r="5" fill={C.body} stroke={C.dark} strokeWidth="1" />
      {/* Small button 2 */}
      <circle cx="98" cy="124" r="8" fill={C.secondary} stroke={C.dark} strokeWidth="1.5" />
      <circle cx="98" cy="124" r="5" fill={C.body} stroke={C.dark} strokeWidth="1" />
      {/* Cable knockouts bottom */}
      <circle cx="64" cy="140" r="5" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <circle cx="80" cy="140" r="5" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <circle cx="96" cy="140" r="5" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
    </g>
  ),

  // id:9 — Limit Switch Kit (24-piece)
  9: (
    <g>
      {/* Tray/box */}
      <rect x="20" y="30" width="120" height="100" rx="3" fill={C.light} stroke={C.dark} strokeWidth="1.5" />
      <rect x="24" y="34" width="112" height="92" rx="2" fill={C.white} stroke={C.secondary} strokeWidth="0.75" />
      {/* Grid dividers */}
      <line x1="66" y1="34" x2="66" y2="126" stroke={C.secondary} strokeWidth="0.75" />
      <line x1="114" y1="34" x2="114" y2="126" stroke={C.secondary} strokeWidth="0.75" />
      <line x1="24" y1="80" x2="136" y2="80" stroke={C.secondary} strokeWidth="0.75" />

      {/* Switch 1 — roller lever style (top-left cell) */}
      <rect x="28" y="38" width="32" height="20" rx="2" fill={C.body} stroke={C.dark} strokeWidth="1" />
      {/* Roller lever arm */}
      <line x1="44" y1="38" x2="44" y2="28" stroke={C.dark} strokeWidth="1.5" />
      <circle cx="44" cy="26" r="4" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      {/* M12 connector */}
      <rect x="34" y="56" width="12" height="8" rx="2" fill={C.secondary} stroke={C.dark} strokeWidth="0.75" />
      {[[36,59],[42,59],[36,62],[42,62]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="1.2" fill={C.dark} />
      ))}

      {/* Switch 2 — plunger style (top-center cell) */}
      <rect x="72" y="42" width="32" height="20" rx="2" fill={C.body} stroke={C.dark} strokeWidth="1" />
      {/* Plunger */}
      <rect x="84" y="32" width="8" height="12" rx="1" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <rect x="82" y="30" width="12" height="4" rx="2" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      {/* M12 connector */}
      <rect x="78" y="60" width="12" height="8" rx="2" fill={C.secondary} stroke={C.dark} strokeWidth="0.75" />

      {/* Switch 3 — adjustable rod lever (top-right cell) */}
      <rect x="118" y="42" width="14" height="20" rx="2" fill={C.body} stroke={C.dark} strokeWidth="1" />
      {/* Rod lever */}
      <line x1="125" y1="42" x2="125" y2="32" stroke={C.dark} strokeWidth="1.5" />
      <line x1="125" y1="32" x2="118" y2="26" stroke={C.dark} strokeWidth="1.5" />
      <circle cx="118" cy="26" r="3" fill={C.secondary} stroke={C.dark} strokeWidth="0.75" />

      {/* Bottom row: more switches */}
      {/* Multiple small units bottom left */}
      {[28, 40, 52].map((x, i) => (
        <g key={i}>
          <rect x={x} y="84" width="10" height="14" rx="1" fill={C.body} stroke={C.dark} strokeWidth="0.75" />
          <rect x={x + 1} y="85" width="8" height="4" rx="0.5" fill={C.secondary} />
        </g>
      ))}
      {/* Bottom center group */}
      {[70, 82, 94, 106].map((x, i) => (
        <g key={i}>
          <rect x={x} y="84" width="10" height="14" rx="1" fill={C.body} stroke={C.dark} strokeWidth="0.75" />
          <line x={x+2} y1="90" x2={x+8} y2="90" stroke={C.secondary} strokeWidth="0.5" />
        </g>
      ))}
      {/* Bottom right */}
      {[118, 126].map((x, i) => (
        <g key={i}>
          <rect x={x} y="84" width="10" height="14" rx="1" fill={C.body} stroke={C.dark} strokeWidth="0.75" />
          <rect x={x+1} y="96" width="8" height="3" rx="0.5" fill={C.secondary} />
        </g>
      ))}

      {/* Label on tray */}
      <rect x="36" y="110" width="88" height="14" rx="1" fill={C.body} stroke={C.secondary} strokeWidth="0.75" />
      <line x1="40" y1="114" x2="120" y2="114" stroke={C.secondary} strokeWidth="0.5" />
      <line x1="40" y1="117" x2="100" y2="117" stroke={C.secondary} strokeWidth="0.5" />
    </g>
  ),

  // id:10 — DIN Rail Power Supply (480W/24VDC)
  10: (
    <g>
      {/* Narrow tall PSU body */}
      <rect x="48" y="16" width="64" height="116" rx="2" fill={C.body} stroke={C.dark} strokeWidth="1.5" />
      {/* Ventilation slots top */}
      {[20, 24, 28, 32, 36, 40, 44].map((y, i) => (
        <rect key={i} x="54" y={y} width="52" height="2.5" rx="1" fill={C.secondary} stroke={C.dark} strokeWidth="0.5" />
      ))}
      {/* Status LED */}
      <circle cx="80" cy="54" r="4" fill={C.led_green} stroke={C.dark} strokeWidth="0.75" />
      <circle cx="80" cy="54" r="2" fill="#6dffa0" />
      {/* Adjustment trimpot */}
      <circle cx="80" cy="66" r="5" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <circle cx="80" cy="66" r="2" fill={C.panel} />
      <line x1="80" y1="62" x2="80" y2="66" stroke={C.white} strokeWidth="1" />
      {/* Label area */}
      <rect x="52" y="74" width="56" height="28" rx="1" fill={C.white} stroke={C.secondary} strokeWidth="0.75" />
      <line x1="56" y1="80" x2="104" y2="80" stroke={C.secondary} strokeWidth="0.5" />
      <line x1="56" y1="85" x2="104" y2="85" stroke={C.secondary} strokeWidth="0.5" />
      <line x1="56" y1="90" x2="104" y2="90" stroke={C.secondary} strokeWidth="0.5" />
      <line x1="56" y1="95" x2="88" y2="95" stroke={C.secondary} strokeWidth="0.5" />
      {/* Input terminals top */}
      <rect x="52" y="104" width="56" height="12" rx="1" fill={C.secondary} stroke={C.dark} strokeWidth="0.75" />
      {[56, 64, 72, 80, 88, 96, 104].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="110" r="3" fill={C.body} stroke={C.dark} strokeWidth="0.75" />
          <line x1={x} y1="107" x2={x} y2="113" stroke={C.dark} strokeWidth="0.5" />
        </g>
      ))}
      {/* DIN rail clip */}
      <rect x="54" y="124" width="52" height="8" rx="1" fill={C.dark} stroke={C.dark} strokeWidth="1" />
      <rect x="58" y="122" width="8" height="12" rx="1" fill={C.secondary} stroke={C.dark} strokeWidth="0.75" />
      <rect x="94" y="122" width="8" height="12" rx="1" fill={C.secondary} stroke={C.dark} strokeWidth="0.75" />
      {/* Output terminals */}
      <rect x="52" y="134" width="56" height="12" rx="1" fill={C.secondary} stroke={C.dark} strokeWidth="0.75" />
      {[58, 66, 74, 82, 90, 98].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="140" r="3" fill={i < 3 ? '#E74C3C' : '#1a1a1a'} stroke={C.dark} strokeWidth="0.75" />
        </g>
      ))}
    </g>
  ),

  // id:11 — Rack-Mount UPS (3kVA)
  11: (
    <g>
      {/* 2U rack body — wide flat rectangle */}
      <rect x="14" y="54" width="132" height="52" rx="2" fill={C.body} stroke={C.dark} strokeWidth="1.5" />
      {/* Front panel dark face */}
      <rect x="18" y="58" width="124" height="44" rx="1" fill={C.panel} stroke={C.dark} strokeWidth="1" />
      {/* Front handles */}
      <rect x="18" y="60" width="12" height="40" rx="2" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <rect x="130" y="60" width="12" height="40" rx="2" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      {/* LCD display */}
      <rect x="32" y="62" width="42" height="30" rx="1" fill="#0a1a0a" stroke={C.secondary} strokeWidth="1" />
      {/* Battery bar graph */}
      {[36, 42, 48, 58, 64, 70].map((x, i) => (
        <rect key={i} x={x} y={70 - i * 1.5} width="4" height={8 + i * 1.5} rx="0.5"
          fill={i < 4 ? C.led_green : '#1a3a1a'} />
      ))}
      {/* Battery icon */}
      <rect x="38" y="84" width="18" height="6" rx="1" fill="#1a3a1a" stroke={C.led_green} strokeWidth="0.75" />
      <rect x="56" y="86" width="3" height="2" rx="0.5" fill={C.led_green} />
      {/* Load bar */}
      {[36, 40, 44, 48, 52, 56, 60, 64].map((x, i) => (
        <rect key={i} x={x} y="88" width="3" height="2" rx="0.3"
          fill={i < 5 ? C.led_green : '#1a3a1a'} />
      ))}
      {/* Outlet row */}
      {[82, 96, 110].map((x, i) => (
        <g key={i}>
          <rect x={x} y="65" width="16" height="20" rx="2" fill="#1a1a1a" stroke={C.secondary} strokeWidth="0.75" />
          <circle cx={x + 5} cy="71" r="2" fill="#333" />
          <circle cx={x + 11} cy="71" r="2" fill="#333" />
          <rect x={x + 5} y="76" width="6" height="4" rx="1" fill="#333" />
        </g>
      ))}
      {/* USB/serial ports */}
      <rect x="82" y="88" width="10" height="7" rx="1" fill="#1a1a1a" stroke={C.secondary} strokeWidth="0.75" />
      <rect x="94" y="88" width="10" height="7" rx="1" fill="#1a1a1a" stroke={C.secondary} strokeWidth="0.75" />
      {/* Status LEDs row */}
      <circle cx="126" cy="70" r="3" fill={C.led_green} />
      <circle cx="126" cy="80" r="3" fill={C.led_green} />
      <circle cx="126" cy="90" r="3" fill={C.led_yellow} />
      {/* Rack ears */}
      <rect x="12" y="54" width="6" height="52" rx="1" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <circle cx="15" cy="62" r="2.5" fill={C.panel} stroke={C.dark} strokeWidth="0.75" />
      <circle cx="15" cy="98" r="2.5" fill={C.panel} stroke={C.dark} strokeWidth="0.75" />
      <rect x="142" y="54" width="6" height="52" rx="1" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <circle cx="145" cy="62" r="2.5" fill={C.panel} stroke={C.dark} strokeWidth="0.75" />
      <circle cx="145" cy="98" r="2.5" fill={C.panel} stroke={C.dark} strokeWidth="0.75" />
    </g>
  ),

  // id:12 — Electric Pallet Jack
  12: (
    <g>
      {/* Fork blades — two long tines extending right */}
      <rect x="58" y="96" width="88" height="10" rx="1" fill={C.body} stroke={C.dark} strokeWidth="1.5" />
      <rect x="58" y="112" width="88" height="10" rx="1" fill={C.body} stroke={C.dark} strokeWidth="1.5" />
      {/* Fork tips */}
      <polygon points="146,96 150,101 146,106" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <polygon points="146,112 150,117 146,122" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      {/* Fork wheels */}
      <circle cx="100" cy="128" r="8" fill={C.panel} stroke={C.dark} strokeWidth="1.5" />
      <circle cx="100" cy="128" r="4" fill={C.secondary} />
      <circle cx="130" cy="128" r="8" fill={C.panel} stroke={C.dark} strokeWidth="1.5" />
      <circle cx="130" cy="128" r="4" fill={C.secondary} />
      {/* Power unit / body */}
      <rect x="22" y="74" width="42" height="60" rx="4" fill={C.body} stroke={C.dark} strokeWidth="1.5" />
      {/* Battery compartment */}
      <rect x="26" y="78" width="34" height="32" rx="2" fill={C.panel} stroke={C.dark} strokeWidth="1" />
      <line x1="30" y1="82" x2="56" y2="82" stroke={C.secondary} strokeWidth="0.75" />
      <line x1="30" y1="86" x2="56" y2="86" stroke={C.secondary} strokeWidth="0.75" />
      <line x1="30" y1="90" x2="56" y2="90" stroke={C.secondary} strokeWidth="0.75" />
      <line x1="30" y1="94" x2="56" y2="94" stroke={C.secondary} strokeWidth="0.75" />
      {/* Battery indicator */}
      <rect x="28" y="98" width="30" height="8" rx="1" fill="#1a3a1a" stroke={C.led_green} strokeWidth="0.75" />
      {[30, 35, 40, 45, 50].map((x, i) => (
        <rect key={i} x={x} y="100" width="4" height="4" rx="0.5" fill={i < 4 ? C.led_green : '#1a3a1a'} />
      ))}
      {/* Drive wheel */}
      <circle cx="43" cy="144" r="12" fill={C.panel} stroke={C.dark} strokeWidth="1.5" />
      <circle cx="43" cy="144" r="7" fill={C.secondary} stroke={C.dark} strokeWidth="1" />
      <circle cx="43" cy="144" r="3" fill={C.panel} />
      {/* Fork connection junction */}
      <rect x="56" y="90" width="16" height="42" rx="2" fill={C.secondary} stroke={C.dark} strokeWidth="1.5" />
      <line x1="56" y1="106" x2="72" y2="106" stroke={C.dark} strokeWidth="1" />
      {/* Tiller / handle */}
      <line x1="28" y1="74" x2="22" y2="40" stroke={C.dark} strokeWidth="3" strokeLinecap="round" />
      <line x1="34" y1="74" x2="22" y2="40" stroke={C.dark} strokeWidth="2" strokeLinecap="round" />
      {/* Handle grip */}
      <rect x="10" y="34" width="24" height="8" rx="4" fill={C.panel} stroke={C.dark} strokeWidth="1.5" />
      {/* Control buttons on handle */}
      <circle cx="16" cy="38" r="2.5" fill={C.led_green} stroke={C.dark} strokeWidth="0.75" />
      <circle cx="28" cy="38" r="2.5" fill={C.led_red} stroke={C.dark} strokeWidth="0.75" />
    </g>
  ),
};

export default function ProductImage({ productId, size = 'md', className = '' }) {
  const px = SIZES[size] ?? SIZES.md;
  return (
    <svg width={px} height={px} viewBox="0 0 160 160" className={className} aria-hidden="true">
      {SVG_MAP[productId] ?? SVG_MAP[1]}
    </svg>
  );
}
