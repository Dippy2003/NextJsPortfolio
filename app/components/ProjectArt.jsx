const accentByKind = ['#c6d9a9', '#d7a373', '#b8b0d5'];

export default function ProjectArt({ kind = 0 }) {
  const accent = accentByKind[kind];
  return (
    <svg
      viewBox="0 0 600 340"
      width="100%"
      height="100%"
      role="img"
      aria-label={
        [
          'Concept illustration of pose estimation',
          'Concept illustration of workload analytics',
          'Concept illustration of a retrieval pipeline',
        ][kind]
      }
    >
      <rect x="38" y="24" width="524" height="292" rx="12" fill="#151b17" stroke="#3b4437" />
      <path d="M38 62h524" stroke="#353d31" />
      {[58, 70, 82].map((x) => (
        <circle key={x} cx={x} cy="44" r="3" fill="#5d6555" />
      ))}
      <text x="103" y="48" fill="#c1c6b7" fontFamily="monospace" fontSize="10">
        {
          ['repvision / pose studio', 'playerpulse / workload analysis', 'pinecone / rag studio'][
            kind
          ]
        }
      </text>
      <text x="535" y="48" textAnchor="end" fill={accent} fontFamily="monospace" fontSize="8">
        CONCEPT
      </text>
      {kind === 0 && (
        <>
          <rect x="55" y="78" width="300" height="220" rx="6" fill="#101510" />
          {[110, 165, 220, 275, 330].map((x) => (
            <path key={x} d={`M${x} 78v220`} stroke="#202a20" />
          ))}
          {[122, 166, 210, 254].map((y) => (
            <path key={y} d={`M55 ${y}h300`} stroke="#202a20" />
          ))}
          <path
            d="M199 136l-28 34 26 35-41 38-22 31M199 136l33 30-35 39 39 31 27 37M171 170l-31-29M232 166l29-26"
            stroke={accent}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="201" cy="115" r="15" stroke={accent} strokeWidth="3" fill="none" />
          {[
            [199, 136],
            [171, 170],
            [197, 205],
            [156, 243],
            [134, 274],
            [232, 166],
            [236, 236],
            [263, 273],
            [140, 141],
            [261, 140],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#141b12" stroke={accent} strokeWidth="2" />
          ))}
          <path
            d="M73 103v-9h9M337 103v-9h-9M73 276v9h9M337 276v9h-9"
            stroke={accent}
            fill="none"
          />
          <text x="375" y="106" fill="#969f8d" fontFamily="monospace" fontSize="9">
            MOVEMENT → INSIGHT
          </text>
          <text x="375" y="145" fill={accent} fontSize="22" fontFamily="sans-serif">
            Every rep.
          </text>
          <text x="375" y="174" fill="#e5e8df" fontSize="22" fontFamily="sans-serif">
            Better form.
          </text>
          <path d="M375 197h162" stroke="#3b4437" />
          {['Pose estimation', 'Rep counting', 'Form feedback'].map((t, i) => (
            <g key={t}>
              <circle cx="380" cy={222 + i * 26} r="3" fill={accent} />
              <text x="392" y={226 + i * 26} fill="#b0b8a6" fontSize="11" fontFamily="monospace">
                {t}
              </text>
            </g>
          ))}
        </>
      )}
      {kind === 1 && (
        <>
          <text x="61" y="103" fill="#a8af9c" fontFamily="monospace" fontSize="9">
            UNDERSTAND THE GAME BEHIND THE GAME.
          </text>
          <text x="61" y="137" fill="#e2e5db" fontFamily="sans-serif" fontSize="23">
            Workload. Recovery. Readiness.
          </text>
          <rect x="58" y="157" width="327" height="140" rx="5" fill="#101510" />
          {[184, 217, 250, 283].map((y) => (
            <path key={y} d={`M72 ${y}h299`} stroke="#273022" />
          ))}
          <path
            d="M72 260l29-8 28 5 27-39 28 16 29-55 28 32 29-10 27 41 29-30 29-16 16 13"
            stroke={accent}
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M72 278l29-11 28 3 27-7 28 5 29-16 28 10 29-21 27 8 29-3 29-15 16 5"
            stroke="#7b9675"
            strokeWidth="2"
            strokeDasharray="5 5"
            fill="none"
          />
          <text x="407" y="184" fill={accent} fontSize="10" fontFamily="monospace">
            EXPLAINABLE
          </text>
          <text x="407" y="204" fill="#d4d9cc" fontSize="14" fontFamily="sans-serif">
            Player insights
          </text>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="407" y={220 + i * 17} width="128" height="6" rx="3" fill="#2d3527" />
              <rect
                x="407"
                y={220 + i * 17}
                width={[92, 65, 109, 76][i]}
                height="6"
                rx="3"
                fill={i % 2 ? '#7b9675' : accent}
                opacity={1 - i * 0.12}
              />
            </g>
          ))}
        </>
      )}
      {kind === 2 && (
        <>
          <text x="62" y="102" fill="#d3cee2" fontFamily="sans-serif" fontSize="23">
            Your notes. Connected.
          </text>
          <text x="62" y="125" fill="#949b8a" fontFamily="monospace" fontSize="9">
            FROM LECTURE NOTES TO CONTEXTUAL ANSWERS
          </text>
          <path d="M161 211h64m146 0h65" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />
          {[
            ['LECTURE NOTES', 62, 99],
            ['VECTOR SEARCH', 227, 144],
            ['GROUNDED ANSWER', 437, 103],
          ].map(([label, x, w], i) => (
            <g key={label}>
              <rect x={x} y="165" width={w} height="93" rx="8" fill="#1f2520" stroke="#48503f" />
              <text
                x={Number(x) + Number(w) / 2}
                y="239"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="7"
                fill="#bdc4b1"
              >
                {label}
              </text>
              {i === 0 ? (
                <g stroke={accent} fill="none">
                  <rect x="99" y="182" width="25" height="29" rx="3" />
                  <path d="M104 190h15m-15 7h15m-15 7h8" />
                </g>
              ) : i === 1 ? (
                <g stroke={accent} fill={accent}>
                  {[
                    [276, 186],
                    [307, 181],
                    [322, 202],
                    [291, 214],
                    [273, 203],
                  ].map(([cx, cy], j) => (
                    <circle key={j} cx={cx} cy={cy} r="3" />
                  ))}
                  <path
                    d="M276 186l31-5 15 21-31 12-18-11zM276 186l15 28m16-33l-34 22"
                    strokeWidth="1"
                    fill="none"
                  />
                </g>
              ) : (
                <g stroke={accent} fill="none">
                  <path d="M470 185h35v22h-21l-8 6v-6h-6z" />
                  <path d="M476 192h22m-22 7h15" />
                </g>
              )}
            </g>
          ))}
          <text
            x="300"
            y="285"
            textAnchor="middle"
            fill={accent}
            fontFamily="monospace"
            fontSize="9"
          >
            RETRIEVE → AUGMENT → GENERATE
          </text>
        </>
      )}
    </svg>
  );
}
