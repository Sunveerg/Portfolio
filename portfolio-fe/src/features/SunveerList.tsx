/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sunveerResponseModel } from './model/sunveerResponseModel';
import { getAllSunveer } from './api/getAllSunveer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/SunveerPage.css';

const SunveerList: React.FC = (): JSX.Element => {
  const [sunveerItems, setSunveerItems] = useState<sunveerResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSunveerData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await getAllSunveer();
        if (Array.isArray(response)) {
          setSunveerItems(response);
        } else {
          console.error('Fetched data is not an array:', response);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSunveerData();
  }, []);

  const handleSunveerClick = (sunveerId: number): void => {
    navigate(`/sunveer/${sunveerId}`);
  };

  if (loading) {
    return <div>Loading items...</div>;
  }

  return (
    <div className="top-section">
      <h2 className="page-title">Sunveer</h2>
      <div className="sunveer-list">
        {sunveerItems.length > 0 ? (
          sunveerItems.map(item => (
            <div
              className="sunveer-item"
              key={item.sunveerId}
              onClick={() => handleSunveerClick(item.sunveerId)}
            >
              <div className="item-content">
                <p className="nationality">Nationality: {item.nationality}</p>
                <p className="age">Age: {item.age}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-items">No items available</p>
        )}
      </div>
    </div>
  );
};

export default SunveerList;
