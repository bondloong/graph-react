import React from 'react';
import withHocs from './DirectorsTableHoc';
import { Link} from "react-router-dom";
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0px auto;
  flex-direction: column;
  flex-wrap: wrap;
}
`

const Director = styled.div`
  min-width: 220px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: center;
}
`
const DirectorPhoto = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 15px 10px;
}
`

const DirectorInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex-basis: 65%;
}
`
const DirectorInfoName = styled.h2`
  display: flex;
  margin: 10px 0;
}
`
const DirectorInfoAge = styled.h3`
  display: flex;
  margin: 5px 0;
}
`
const DirectorInfoMovies = styled.h4`
  display: flex;
  margin: 10px 0;
}
`
const DirectorInfoBIO = styled.div`
  display: flex;
}
`
class DirectorsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      logIn: false,
      user: '',
      password: '',
      users: [
        {id: '1', user: 'admin', password: 'admin'},
        {id: '2', user: 'user', password: 'user'}
      ]
    };

    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleChangeUser(event) {
    this.setState({user: event.target.value});
  }
  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }
  handleExit(event) {
      this.setState({logIn: false})
      localStorage.setItem('document',JSON.stringify(false));
  }
  handleSubmit(event) {
    const {users, user, password} = this.state;
    const findUser = users.find(polz => polz.user === user && polz.password === password );
    if (findUser) {
      this.setState({logIn: true})
      localStorage.setItem('document',JSON.stringify(true));
    } else{
      alert('Не верный логин или пароль')
    }
    event.preventDefault();
  }
  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem('document'));
    if (localStorage.getItem('document')) {
      this.setState({logIn: this.documentData})
    }
}
  render() {
    const { data } = this.props;
    const { directors = [] } = data;
    const { user, password, logIn} = this.state;
    return (
      <Wrapper>
        {
        !logIn?
        <form onSubmit={this.handleSubmit}>
          <label>
            user:<br/>
            <input type="text" value={user}  onChange={this.handleChangeUser} /><br/>
          </label>
          <label>
            password:<br/>
            <input type="password" value={password} onChange={this.handleChangePassword} /><br/>
          </label>
          <input type="submit" value="Войти" />
        </form>
        :
        <>
          <button onClick={this.handleExit}>Выход</button>
          {directors.map(director => {
            return (
              <Director key={director.id}>
                <DirectorPhoto><Link to={`/director/${director.id}`}><img src={director.photo} alt=""/></Link></DirectorPhoto>
                <DirectorInfo>
                  <DirectorInfoName>{director.name}</DirectorInfoName>
                  <DirectorInfoAge>{director.age} лет</DirectorInfoAge>
                  <DirectorInfoMovies>Фильмов снято: {director.movies.length}<Link to={`/director/${director.id}`}>(подробнее)</Link></DirectorInfoMovies>
                  <DirectorInfoBIO>{director.bio} </DirectorInfoBIO>
                </DirectorInfo>
              </Director>
            );
          })}
          </>
        }
      </Wrapper>
    );
  }
};

export default withHocs(DirectorsTable);

