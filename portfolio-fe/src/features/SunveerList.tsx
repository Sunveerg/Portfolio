/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import { sunveerResponseModel } from './model/sunveerResponseModel';
import { getAllSunveer } from './api/getAllSunveer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/SunveerPage.css';
import {useNavigate} from "react-router-dom";

const SunveerList: React.FC = (): JSX.Element => {
  const [sunveerItems, setSunveerItems] = useState<sunveerResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                console.error('No access token found');
                setLoading(false);
                return;
            }

            try {
                const base64Url = accessToken.split('.')[1];
                const decodedPayload = JSON.parse(atob(base64Url));
                const roles: string[] = decodedPayload['https://portfolio/roles'] || [];
                setIsAdmin(roles.includes('Admin'));
            } catch (err) {
                console.error('Error fetching user info:', err);
            }
        };

        fetchUserInfo();
    }, []);

  useEffect(() => {
    const fetchSunveerData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await getAllSunveer();

        if (Array.isArray(response)) {
          setSunveerItems(
              response.map(item => ({
                ...item,
                quotesList: item.quotesList ?? [] // Default to empty array if null/undefined
              }))
          );
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
          {sunveerItems.length > 0 ? (
              sunveerItems.map(item => (
                  <div key={item.sunveerId} className="sunveer-item">
                    <div className="sunveer-item">
                      <p>{item.description}</p>
                    </div>

                      <div className="sunveer-item">
                    <div className="item-content">
                      <p className="skills">
                        <b>Skills:</b> {item.skills}
                      </p>
                      <p className="hobbies">
                        <b>Hobbies:</b> {item.hobbies}
                      </p>
                    </div>
                      </div>

                    <div className="sunveer-item">
                      <p><b>Favorite Quotes:</b></p>
                      {item.quotesList.length > 0 ? (
                          item.quotesList.map(quote => (
                              <p key={quote.quote}>
                                 "{quote.quote}"
                                <br />
                                - {quote.author}
                              </p>
                          ))
                      ) : (
                          <p className="no-items">No quotes available</p>
                      )}
                    </div>
                      {isAdmin && (
                      <button className="edit-button" onClick={() => navigate(`/updateSunveer/${item.sunveerId}`)}>✏️</button>
                    )}
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
