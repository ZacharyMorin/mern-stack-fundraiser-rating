import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router";
import api from '../api';

export default function Edit() {
  const [form, setForm] = useState({
    fundraiser_name: "",
    reviewer_name: "",
    reviewer_email: "",
    description:"",
    reviewer_date: new Date().toUTCString(),
    overall_rating: "5",
  });

  const [fundraiser, setFundraiser] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await api.getFundraiserById(id);

      if (response.status !== 200) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = response.data;


      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm({
        fundraiser_name: record.fundraiser_name,
      });

      setFundraiser(record);
    }

    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return {
        ...prev,
        ...value
      };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    fundraiser.reviews = [
      ...fundraiser.reviews,
      {
        reviewer_name: form.reviewer_name,
        reviewer_email: form.reviewer_email,
        rating: form.overall_rating,
        description: form.description,
        reviewer_date: new Date().toUTCString()
      }
    ]

    // Make API call to update the fundraiser
    await api.editFundraiser(params.id, fundraiser).then(res => {

      // Future Zach: What happens if the res has a different error?
      if (res && res.error === "Duplicate Email") {
        const message = `Sorry! Only one review per user.`;
        window.alert(message);
        return;
      }

      navigate("/");
    })
  }

  return (
      <div className="ps-3 pe-3">
        <h3>Leave a Review</h3>
        <form onSubmit={onSubmit} className="needs-validation">
          <div className="form-group">
            <label htmlFor="name">Fundraiser Name: </label>
            <input
                type="text"
                className="form-control"
                readOnly={true}
                id="fundraiser_name"
                value={form.fundraiser_name}
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
