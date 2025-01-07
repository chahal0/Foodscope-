import React, { useState, useEffect } from 'react';
import './UserDashboard.css';
import { Button, Card, Container, Row, Col, Table } from 'react-bootstrap';
import { FaAward, FaUtensils, FaClipboardCheck, FaBell, FaDollarSign } from 'react-icons/fa';
import swatiiiAvatar from '../assets/swatiii.jpeg';
import heyAvatar from '../assets/avatar.png';

function UserDashboard() {
  const [user, setUser] = useState({
    name: 'Guest',
    avatar: 'https://cdn0.iconfinder.com/data/icons/basic-50/24/essential_basic_ui_user-512.png',
    isLoggedIn: false,
    isPremium: false, // Added premium status
    badges: [
      'Spicy Adventurer',
      'Sweet Tooth',
      'Flavor Explorer',
      'Dessert Devotee',
      'Gourmet Guru',
    ],
    savedRecipes: JSON.parse(localStorage.getItem('savedRecipes')) || [], // Load saved recipes from localStorage
    activities: [],
    mealPlan: {
      Monday: '',
      Tuesday: '',
      Wednesday: '',
      Thursday: '',
      Friday: '',
      Saturday: '',
      Sunday: '',
    },
    loginTime: null,
    logoutTime: null,
  });

  const [notificationPermission, setNotificationPermission] = useState(false);

  // Toggle Login/Logout
  const toggleLogin = () => {
    const currentTime = new Date().toLocaleString();
    if (user.isLoggedIn) {
      setUser({
        ...user,
        name: 'Guest',
        avatar: heyAvatar,
        isLoggedIn: false,
        activities: [...user.activities, 'Logged out'],
        logoutTime: currentTime,
      });
    } else {
      setUser({
        ...user,
        name: 'Swati Singh',
        avatar: swatiiiAvatar,
        isLoggedIn: true,
        activities: [...user.activities, 'Logged in'],
        loginTime: currentTime,
      });
    }
  };

  // Update Meal Plan
  const updateMealPlan = (day, meal) => {
    setUser((prev) => ({
      ...prev,
      mealPlan: {
        ...prev.mealPlan,
        [day]: meal,
      },
      activities: [...prev.activities, `Updated ${day}'s meal plan to "${meal}"`],
    }));
  };

  // Handle Profile Customization
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Push Notifications for Meal Reminders
  const sendReminder = (meal) => {
    if (Notification.permission === 'granted') {
      new Notification(`Reminder: Time for your ${meal}`);
    }
  };

  // Request Notification Permission
  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission().then((permission) => {
          setNotificationPermission(permission === 'granted');
        });
      } else {
        setNotificationPermission(true);
      }
    }
  }, []);

  // Trigger Reminder Notification for Each Day
  useEffect(() => {
    Object.keys(user.mealPlan).forEach((day) => {
      if (user.mealPlan[day]) {
        sendReminder(user.mealPlan[day]);
      }
    });
  }, [user.mealPlan]);

  // Share Recipe Functionality
  const shareRecipe = (recipeName) => {
    alert(`Recipe "${recipeName}" shared!`);
  };

  // Mark Activity as Completed
  const markActivityCompleted = (activityIndex) => {
    const updatedActivities = [...user.activities];
    updatedActivities[activityIndex] = `${updatedActivities[activityIndex]} (Completed)`;
    setUser((prev) => ({
      ...prev,
      activities: updatedActivities,
    }));
  };

  // Refresh timings (Login/Logout timings)
  const refreshTimings = () => {
    setUser({
      ...user,
      loginTime: user.isLoggedIn ? new Date().toLocaleString() : user.loginTime,
      logoutTime: !user.isLoggedIn ? new Date().toLocaleString() : user.logoutTime,
    });
  };

  // Premium Membership Feature
  const togglePremium = () => {
    if (user.isPremium) {
      setUser({
        ...user,
        isPremium: false,
        activities: [...user.activities, 'Cancelled Premium Membership'],
      });
    } else {
      setUser({
        ...user,
        isPremium: true,
        activities: [...user.activities, 'Bought Premium Membership'],
      });
    }
  };

  // Save Recipe Function
  const saveRecipe = (recipe) => {
    const updatedSavedRecipes = [...user.savedRecipes, recipe];
    setUser({
      ...user,
      savedRecipes: updatedSavedRecipes,
    });
    localStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes)); // Update localStorage
    alert(`Recipe "${recipe.name}" saved!`);
  };

  return (
    <Container className="user-dashboard my-5">
      {/* Login and Badges Section */}
      <Row className="justify-content-center">
        <Col md={5} className="mb-4">
          <Card className="user-dashboard__login text-center shadow-lg p-4">
            <Card.Body>
              <img src={user.avatar} alt="User Avatar" className="avatar mb-3" />
              <h2>{user.name}</h2>
              {user.isLoggedIn && (
                <>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleProfileChange}
                    className="form-control my-3"
                    placeholder="Enter your name"
                  />
                  <input
                    type="file"
                    onChange={(e) =>
                      handleProfileChange({
                        target: { name: 'avatar', value: e.target.files[0].name },
                      })
                    }
                    className="my-3"
                    accept="image/*"
                  />
                </>
              )}
              <Button
                onClick={toggleLogin}
                variant="warning"
                className="w-100 py-2"
              >
                {user.isLoggedIn ? 'Logout' : 'Login'}
              </Button>
              {user.isLoggedIn && (
                <div className="mt-3">
                  <span>Login Time: {user.loginTime}</span>
                  <br />
                  <span>Logout Time: {user.logoutTime}</span>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={7} className="mb-4">
          <Card className="user-dashboard__badges text-center shadow-lg p-4">
            <Card.Body>
              <h2 className="heading-style">
                <FaAward className="mr-2" />
                My Badges
              </h2>
              <Row className="justify-content-center">
                {user.badges.map((badge, index) => (
                  <Col key={index} md={3} className="mb-3">
                    <div className="user-dashboard__badge text-center p-3">
                      {badge}
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Saved Recipes Section */}
      <h2 className="text-center my-4 heading-style">
        <FaUtensils className="mr-2" />
        Saved Recipes
      </h2>
      <ul className="user-dashboard__recipes list-unstyled">
        {user.savedRecipes.length > 0 ? (
          user.savedRecipes.map((recipe, index) => (
            <li key={index} className="d-flex justify-content-between align-items-center mb-3">
              {recipe.name}
              <Button onClick={() => shareRecipe(recipe.name)} variant="danger" size="sm">
                Share
              </Button>
            </li>
          ))
        ) : (
          <li>No saved recipes yet</li>
        )}
      </ul>

      {/* Meal Planner Section */}
      <h2 className="text-center my-4 heading-style">
        <FaClipboardCheck className="mr-2" />
        Meal Planner
      </h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Day</th>
            <th>Planned Meal</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(user.mealPlan).map((day) => (
            <tr key={day}>
              <td>{day}</td>
              <td
                contentEditable="true"
                onBlur={(e) => updateMealPlan(day, e.target.textContent)}
              >
                {user.mealPlan[day] || 'Add meal'}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Activity Tracker Section */}
      <h2 className="text-center my-4 heading-style">
        <FaBell className="mr-2" />
        Activity Tracker
      </h2>
      <ul className="user-dashboard__activities list-unstyled">
        {user.activities.length === 0 ? (
          <li>No activities yet</li>
        ) : (
          user.activities.map((activity, index) => (
            <li
              key={index}
              className={`d-flex justify-content-between align-items-center mb-3 ${activity.includes('(Completed)') ? 'completed' : ''}`}
            >
              {activity === 'Logged in' && user.loginTime ? (
                <span>Logged in at: {user.loginTime}</span>
              ) : activity === 'Logged out' && user.logoutTime ? (
                <span>Logged out at: {user.logoutTime}</span>
              ) : (
                activity
              )}
              {activity !== 'Logged out' && activity !== 'Logged in' && (
                <Button variant="success" size="sm" onClick={() => markActivityCompleted(index)}>
                  Mark as Completed
                </Button>
              )}
            </li>
          ))
        )}
      </ul>

      {/* Premium Membership Section */}
      <h2 className="text-center my-4 heading-style">
        <FaDollarSign className="mr-2" />
        Premium Membership
      </h2>
      <Card className="user-dashboard__premium text-center shadow-lg p-4">
        <Card.Body>
          <h3>Exclusive Benefits for Premium Members</h3>
          <ul className="user-dashboard__premium-perks">
            <li>Ad-free experience</li>
            <li>Access to exclusive content</li>
            <li>Priority customer support</li>
            <li>Special offers and discounts</li>
          </ul>
          <Button
            onClick={togglePremium}
            variant={user.isPremium ? 'danger' : 'success'}
            className="py-2 px-5 mt-3"
          >
            {user.isPremium ? 'Cancel Premium Membership' : 'Buy Premium Membership'}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserDashboard;
