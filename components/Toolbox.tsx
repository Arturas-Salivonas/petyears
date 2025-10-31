'use client';

import Accordion from './Accordion';
import styles from '../styles/Toolbox.module.css';

export default function Toolbox() {
  const chartData = [
    { dog: 1, human: 15 },
    { dog: 2, human: 24 },
    { dog: 3, human: 28 },
    { dog: 5, human: 36 },
    { dog: 7, human: 47 },
    { dog: 10, human: 60 },
    { dog: 15, human: 83 }
  ];

  const accordionItems = [
    {
      id: 'formula',
      title: 'How We Calculate Your Dog\'s Age',
      icon: '🧠',
      content: (
        <div>
          {/* Age Conversion Chart */}
          <div className={styles.chartSection}>
            <h4 className={styles.chartTitle}>
              📊 Age Conversion Chart
            </h4>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr className={styles.tableHeader}>
                    <th className={styles.tableHeaderCell}>Dog Age</th>
                    <th className={styles.tableHeaderCell}>Human Age</th>
                    <th className={styles.tableHeaderCell}>Life Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((row, index) => (
                    <tr key={index} className={styles.tableBody}>
                      <td className={styles.tableDogAge}>{row.dog} years</td>
                      <td className={styles.tableHumanAge}>{row.human} years</td>
                      <td className={styles.tableLifeStage}>
                        {row.dog < 2 ? 'Puppy' : row.dog < 7 ? 'Adult' : 'Senior'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Visual Chart Removed */}
          </div>

          {/* Research Note */}
          <div className={styles.researchSection}>
            <h4 className={styles.researchTitle}>
              🔬 Research Basis
            </h4>
            <p className={styles.researchText}>
              Our age conversion tables are based on comprehensive veterinary research that accounts for
              different aging patterns across dog breeds and sizes. Large and giant breeds tend to age faster
              and have shorter lifespans compared to smaller breeds.
            </p>
            <div className={styles.researchNote}>
              <strong>Key Finding:</strong> Dog size significantly impacts aging rate. Small dogs live longer
              and age more slowly, while giant breeds age rapidly and have shorter lifespans.
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <Accordion
      items={accordionItems}
      type="single"
    />
  );
}