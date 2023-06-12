import React, { useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Container, Form, Button, Image, Card, Divider, Placeholder, Message, Icon } from 'semantic-ui-react';
import logo from './logo-github.png';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(0); // Variable d'état pour le nombre total de comptes correspondant à la recherche
  const [currentPage, setCurrentPage] = useState(1); // Variable d'état pour le numéro de page actuel
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const searchResponse = await axios.get(`https://api.github.com/search/repositories?q=${searchTerm}&per_page=1`);
      const totalCount = searchResponse.data.total_count;
      setTotalCount(totalCount); // Met à jour le nombre total de comptes correspondant à la recherche
      // Effectuer d'autres traitements avec le totalCount

      const reposResponse = await axios.get(`https://api.github.com/search/repositories?q=${searchTerm}&sort=stars&order=desc&page=1&per_page=9`);
      setRepos(reposResponse.data.items);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${searchTerm}&sort=stars&order=desc&page=${nextPage}&per_page=9`
      );
      setRepos((prevRepos) => [...prevRepos, ...response.data.items]);
      setCurrentPage(nextPage);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  
  return (
    <Container>
      <Image src={logo} alt="GitHub Logo" style={{ display: 'block', margin: '0 auto' }} />

      <h1 style={{ textAlign: 'center' }}>GitHub Repositories Search</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={handleChange}
          />
        </Form.Field>

        <Message info>
          <p>La recherche a donné {totalCount} résultat(s).</p>
        </Message>
      </Form>

      <Divider />
      {isLoading && (
        <Placeholder>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
        </Placeholder>
      )}

      {error && <Message negative>{error}</Message>}

      <Card.Group itemsPerRow={3}>
        {repos.map((repo) => (
          <Card key={repo.id}>
            <Card.Content>
              <Image src={repo.owner.avatar_url} alt={repo.name} size="extra" style={{ paddingBottom: '15px' }} />
              <Card.Header>{repo.name}</Card.Header>
              <Card.Meta>{repo.full_name}</Card.Meta>
              <Card.Description>{repo.description}</Card.Description>
            </Card.Content>
            <Card.Content extra></Card.Content>
          </Card>
        ))}
      </Card.Group>

      {repos.length > 0 && repos.length % 9 === 0 && !isLoading && (
        <Button onClick={handleLoadMore}>Load More</Button>
      )}
    </Container>
  );
};

export default App;