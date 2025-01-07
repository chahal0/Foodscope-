import React from 'react';

// Example flavor data
const flavors = [
  'Chocolate',
  'Strawberry',
  'Vanilla',
  'Mint',
  'Peanut Butter',
];

// Pairing compatibility (1 = good pairing, 0 = bad pairing)
const pairingMatrix = [
  [1, 1, 1, 0, 1], // Chocolate
  [1, 1, 1, 1, 0], // Strawberry
  [1, 1, 1, 1, 1], // Vanilla
  [0, 1, 1, 1, 0], // Mint
  [1, 0, 1, 0, 1], // Peanut Butter
];

const FlavourPairingMatrix = () => {
  return (
    <div className="flavour-pairing-matrix">
      <h2>Flavor Pairing Matrix</h2>
      <table>
        <thead>
          <tr>
            <th>Flavor</th>
            {flavors.map((flavor, index) => (
              <th key={index}>{flavor}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pairingMatrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{flavors[rowIndex]}</td>
              {row.map((pair, colIndex) => (
                <td key={colIndex} className={pair === 1 ? 'good-pairing' : 'bad-pairing'}>
                  {pair === 1 ? '✔️' : '❌'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlavourPairingMatrix;
