import * as R from "ramda";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { addPhoneToBasket, fetchCategories, fetchPhones } from "../actions/Phones";
import { getPhones } from "../selectors/Phones";

class Phones extends React.Component {
  componentDidMount() {
    window.analytics.page();
    this.props.fetchPhones();
    this.props.fetchCategories();
  }

  renderPhone = (phone, index) => {
    const { addPhoneToBasket } = this.props;
    const shortDesc = `${R.take(60, phone.description)}...`;
    return (
      <div className="col-sm-4 col-lg-4 col-md-4 book-list" key={index}>
        <div className="thumbnail">
          <img className="img-thumbnail" src={phone.image} alt={phone.name} />
        </div>
        <div className="caption">
          <h4 className="pull-right">${phone.price}</h4>
          <h4>{phone.name}</h4>
          <p> {shortDesc}</p>
          <p className="itemButton">
            <button
              className="btn btn-primary"
              onClick={() => addPhoneToBasket(phone.id)}
            >
              Buy Now
            </button>
            <Link to={`/Phones/${phone.id}`} className="btn btn-default">
              More Info
            </Link>
          </p>
        </div>
      </div>
    );
  };

  render() {
    const { phones } = this.props;
    return (
      <div>
        <div className="books row">
          {phones.map((phone, index) => {
            return this.renderPhone(phone, index);
          })}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchPhones: () => dispatch(fetchPhones()),
  addPhoneToBasket: (id) => dispatch(addPhoneToBasket(id)),
  fetchCategories: () => dispatch(fetchCategories()),
});
//ownProps are available here because this component is defined directly on route.
//child componenets must include compose withRoutes
const mapStateToProps = (state, ownProps) => ({
  phones: getPhones(state, ownProps),
});

export default connect(mapStateToProps, mapDispatchToProps)(Phones);
