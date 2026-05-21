import BrandMark from './BrandMark';
import { asLowAsMonthlyCents } from '../lib/rates';

const dollars = (cents) => (cents / 100).toFixed(2);
const monthlyEstimate = (cents) => dollars(asLowAsMonthlyCents(cents));

// Below this synthetic floor the BNPL split doesn't make sense
const MIN_BNPL_CENTS = 100;

export default function BackdOfferCard({ totalCents }) {
  if (totalCents < MIN_BNPL_CENTS) {
    return (
      <div
        style={{
          background: '#EDF7F4',
          border: '1px solid #D6E7E0',
          borderRadius: 10,
          padding: '14px 18px',
          margin: '16px 0',
          textAlign: 'center',
          fontSize: 13,
          color: '#5a6a66',
        }}
      >
        BackdPayments available on orders over $1
      </div>
    );
  }

  return (
    <div
      style={{
        background: '#EDF7F4',
        border: '1px solid #D6E7E0',
        borderRadius: 10,
        padding: '14px 18px',
        margin: '16px 0',
        boxShadow:
          '0 2px 6px rgba(11,39,43,.08), 0 1px 2px rgba(11,39,43,.04), inset 0 1px 0 rgba(255,255,255,.7)',
      }}
    >
      {/* Row 1: Net 30 | OR | as low as */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/* Net 30 */}
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontSize: 22,
              fontWeight: 600,
              lineHeight: 1,
              color: '#0B272B',
              margin: 0,
            }}
          >
            Net 30
          </p>
          <p
            style={{
              marginTop: 6,
              fontSize: 11,
              color: '#5a6a66',
              margin: '6px 0 0',
            }}
          >
            Up to 90 days
          </p>
        </div>

        {/* OR divider */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
          aria-hidden="true"
        >
          <span
            style={{
              display: 'block',
              width: 1,
              height: 20,
              background: 'rgba(38,147,116,0.45)',
            }}
          />
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#3d5a52',
            }}
          >
            OR
          </span>
          <span
            style={{
              display: 'block',
              width: 1,
              height: 20,
              background: 'rgba(38,147,116,0.45)',
            }}
          />
        </div>

        {/* As low as */}
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontSize: 11,
              color: '#5a6a66',
              margin: 0,
            }}
          >
            as low as
          </p>
          <p
            style={{
              marginTop: 4,
              fontSize: 22,
              fontWeight: 600,
              lineHeight: 1,
              color: '#0B272B',
              margin: '4px 0 0',
            }}
          >
            ${monthlyEstimate(totalCents)}
            <span
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: '#5a6a66',
              }}
            >
              /mo
            </span>
          </p>
        </div>
      </div>

      {/* Row 2: with BackdPayments */}
      <div
        style={{
          marginTop: 12,
          paddingTop: 10,
          borderTop: '1px solid rgba(38,147,116,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 400, color: '#8aada4', letterSpacing: '0.12em', textTransform: 'uppercase' }}>with</span>
        <BrandMark size="md" />
      </div>
    </div>
  );
}
