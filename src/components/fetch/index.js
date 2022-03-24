import React from "react";

export default class FetchStudent extends React.Component {
  state = {
    loading: true,
    list: []
  }

  async componentDidMount() {
    const url = "https://api.hatchways.io/assessment/students";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ list: data.students, loading: false })
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.list.length) {
      return <div>didn't get a person</div>;
    }

    return (
      <div>
        {this.state.list.map(profile => (
          <div key={profile.id}>
            <div>{profile.firstName} {profile.lastName}</div>
            <div>{profile.company}</div>
            <div>{profile.email}</div>
            <img src={profile.pic} alt=""/>
            <div>{profile.grades.reduce((a, b) => a + parseInt(b), 0) / profile.grades.length}%</div>
          </div>
        ))}
      </div>
    );
  }
}
