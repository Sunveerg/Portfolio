/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import { sunveerResponseModel } from './model/sunveerResponseModel';
import { getAllSunveer } from './api/getAllSunveer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/SunveerPage.css';

const SunveerList: React.FC = (): JSX.Element => {
  const [sunveerItems, setSunveerItems] = useState<sunveerResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  if (loading) {
    return <div>Loading information...</div>;
  }

  return (
    <div className="top-section">
      <h2 className="page-title">Sunveer Ghumman</h2>
      <img
          src="https://media.licdn.com/dms/image/v2/D4E03AQGall4Soxq-HQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728405851116?e=1743638400&v=beta&t=kKzFYapyUH-TqUI0uN0t9CIGF645me5uIMh7esu0ueg"
          alt="Sunveer Ghumman"
          className="profile-image"
      />

      <div className="sunveer-list">

        <div className="sunveer-item">
          <p>
            I am currently a full-time student at Champlain College studying Computer Science.
            I aspire to become a software engineer and am passionate about learning new technologies.
            I also enjoy travelling, going on hikes and being outside .
          </p>
        </div>
        {sunveerItems.length > 0 ? (
          sunveerItems.map(item => (
            <div
              className="sunveer-item"
              key={item.sunveerId}
            >
              <div className="item-content">
                <p className="skills"><b>Skills:</b> {item.skills}</p>
                <p className="hobbies"><b>Hobbies:</b> {item.hobbies}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-items">No items available</p>
        )}

        <div className="sunveer-item">
          <p>
            <b>Favorite Quotes:</b>
          </p>
          <p>
            "The only way to do great work is to love what you do." - Steve Jobs
          </p>
          <p>
            "One day or day one, you decide." - Paulo Coelho
          </p>
        </div>

      </div>
    </div>
  );
};

export default SunveerList;
