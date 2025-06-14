// components/NavigationButtons.jsx
export const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: '#eee',
      border: 'none',
      padding: '6px 12px',
      cursor: 'pointer',
      borderRadius: '8px',
      fontWeight: 'bold',
    }}
  >
    ← Back
  </button>
);

export const NextButton = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: '#0f62fe',
      color: '#fff',
      border: 'none',
      padding: '6px 12px',
      cursor: 'pointer',
      borderRadius: '8px',
      fontWeight: 'bold',
    }}
  >
    Next →
  </button>
);