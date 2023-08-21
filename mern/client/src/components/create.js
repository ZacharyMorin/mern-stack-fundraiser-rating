import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from '../api';

export default function Create() {
  const [form, setForm] = useState({
    fundraiser_name: "",
    reviewer_name: "",
    reviewer_email: "",
    description:"",
    reviewer_date: new Date().toUTCString(),
    overall_rating: "5",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.

    const newFundraiser = { ...form };

    await api.createFundraiser(newFundraiser).then(() => {
      setForm({
        fundraiser_name: "",
        reviewer_name: "",
        reviewer_email: "",
        description:"",
        reviewer_date: new Date().toUTCString(),
        overall_rating: "5"
      });

      navigate("/");
    })
  }

  // This following section will display the form that takes the input from the user.
  return (
      <div className="ps-3 pe-3" data-testid="create-1">
        <h3>Add a Fundraiser</h3>
        <form onSubmit={onSubmit} className="needs-validation">
          <div className="form-group">
            <label htmlFor="name">Fundraiser Name: </label>
            <input
                type="text"
                className="form-control"
                id="fundraiser_name"
                required
                value={form.fundraiser_name}
                onChange={(e) => updateForm({fundraiser_name: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reviewer_name">Enter Name: </label>
            <input
                type="text"
                className="form-control"
                id="reviewer_name"
                value={form.reviewer_name ?? ""}
                required
                onChange={(e) => updateForm({reviewer_name: e.target.value})}
            />
            <div className="invalid-feedback">
              Please enter a name.
            </div>
          </div>


          <div className="form-group">
            <label htmlFor="reviewer_email">Enter Your Email: </label>
            <input
                type="email"
                className="form-control"
                id="reviewer_email"
                value={form.reviewer_email ?? ""}
                required
                onChange={(e) => updateForm({reviewer_email: e.target.value})}
            />
            <div className="invalid-feedback">
              Please enter a name.
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Review: </label>
            <textarea
                type="text"
                className="form-control"
                id="description"
                value={form.description ?? ""}
                onChange={(e) => updateForm({description: e.target.value})}
            ></textarea>
          </div>

          {/* Rating Radio Buttons */}
          <div className="form-group">
            <div>Rating</div>
            <div className="form-check form-check-inline">
              <label htmlFor="ratingOne" className="form-check-label">1 Star</label>
              <input
                  className="form-check-input"
                  type="radio"
                  name="ratingOptions"
                  id="ratingOne"
                  value="1"
                  required
                  checked={form.overall_rating === "1" }
                  onChange={(e) => updateForm({overall_rating: e.target.value})}
              />
            </div>

            <div className="form-check form-check-inline">
              <label htmlFor="ratingTwo" className="form-check-label">2 Stars</label>
              <input
                  className="form-check-input"
                  type="radio"
                  name="ratingOptions"
                  id="ratingTwo"
                  value="2"
                  required
                  checked={form.overall_rating === "2" }
                  onChange={(e) => updateForm({overall_rating: e.target.value})}
              />

            </div>
            <div className="form-check form-check-inline">
              <label htmlFor="ratingThree" className="form-check-label">3 Stars</label>
              <input
                  className="form-check-input"
                  type="radio"
                  name="ratingOptions"
                  id="ratingThree"
                  value="3"
                  required
                  checked={form.overall_rating === "3" }
                  onChange={(e) => updateForm({overall_rating: e.target.value})}
              />
            </div>

            <div className="form-check form-check-inline">
              <label htmlFor="ratingFour" className="form-check-label">4 Stars</label>
              <input
                  className="form-check-input"
                  type="radio"
                  name="ratingOptions"
                  id="ratingFour"
                  value="4"
                  required
                  checked={form.overall_rating === "4" }
                  onChange={(e) => updateForm({overall_rating: e.target.value})}
              />
            </div>

            <div className="form-check form-check-inline">
              <label htmlFor="ratingTwo" className="form-check-label">5 Stars</label>
              <input
                  className="form-check-input"
                  type="radio"
                  name="ratingOptions"
                  id="rating"
                  value="5"
                  required
                  checked={form.overall_rating === "5" }
                  onChange={(e) => updateForm({overall_rating: e.target.value})}
              />
            </div>
          </div>

          <br/>

          <div className="form-group">
            <input
                type="submit"
                value="Add Review"
                className="btn btn-primary"
            />
          </div>
        </form>
      </div>
  );
}
