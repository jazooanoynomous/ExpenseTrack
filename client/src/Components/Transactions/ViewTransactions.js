import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';

const ViewTransactions = () => {
  const { getIncomes, getExpenses, incomes, expenses } = useGlobalContext();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const handleRowClick = (item) => {
    setSelectedTransaction(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <ViewTransactionsStyled>
      <InnerLayout>
        <h2>Incomes</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th><th>Amount</th><th>Category</th><th>Date</th><th>Description</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map(income => (
              <tr key={income._id} onClick={() => handleRowClick(income)}>
                <td>{income.title}</td>
                <td>{income.amount}</td>
                <td>{income.category}</td>
                <td>{new Date(income.date).toLocaleDateString()}</td>
                <td>{income.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Expenses</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th><th>Amount</th><th>Category</th><th>Date</th><th>Description</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense._id} onClick={() => handleRowClick(expense)}>
                <td>{expense.title}</td>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {isModalOpen && selectedTransaction && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Transaction Details</h3>
              <p><strong>Title:</strong> {selectedTransaction.title}</p>
              <p><strong>Amount:</strong> ${selectedTransaction.amount}</p>
              <p><strong>Category:</strong> {selectedTransaction.category}</p>
              <p><strong>Date:</strong> {new Date(selectedTransaction.date).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {selectedTransaction.description}</p>
              {selectedTransaction.receipt && (
                <div>
                  <strong>Receipt:</strong><br />
                  <img src={selectedTransaction.receipt} alt="Receipt" style={{ width: '100%', marginTop: '10px' }} />
                </div>
              )}
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </InnerLayout>
    </ViewTransactionsStyled>
  );
};

const ViewTransactionsStyled = styled.div`
  h2 {
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    tr:hover {
      background-color: #f1f1f1;
      cursor: pointer;
    }
  }

  .modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(154, 140, 140, 0.5);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 60px 20px;
    overflow-y: auto;
    z-index: 999;
  }

  .modal {
    background: #fff;
    padding: 2rem;
    border-radius: 20px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-in-out;

    img {
      max-height: 300px;
      object-fit: contain;
    }

    button {
      margin-top: 1rem;
      padding: 0.6rem 1.2rem;
      background-color: red;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;


export default ViewTransactions;
