import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Offerzone() {
  const cardsData = [
    {
      title: "Card Title 1",
      text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      imgSrc: "https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/91e53046-98e0-4c5b-ae53-7d073e5210e1/09ece9f7-7ac9-4d1e-afbb-f8ac572add38/hp_sbf_m_biscuits-&-namkeens_480_250923.jpg?tr=w-1920,q=80"
    },
    {
      title: "Card Title 2",
      text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      imgSrc: "https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/91e53046-98e0-4c5b-ae53-7d073e5210e1/09ece9f7-7ac9-4d1e-afbb-f8ac572add38/hp_sbf_m_breakfast-cereals_480_250923.jpg?tr=w-1920,q=80"
    },
    {
      title: "Card Title 3",
      text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      imgSrc: "https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/91e53046-98e0-4c5b-ae53-7d073e5210e1/fefafda6-5ef7-4ed2-8fee-2574720666d7/hp_c&h_m_cleaners_480_250723.jpg?tr=w-1920,q=80"
    },
    {
      title: "Card Title 4",
      text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      imgSrc: "https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/91e53046-98e0-4c5b-ae53-7d073e5210e1/fefafda6-5ef7-4ed2-8fee-2574720666d7/hp_c&h_m_detergents-&-fabric-care_480_250723.jpg?tr=w-1920,q=80"
    }
  ];

  return (
    <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:"space-around"}} data-aos="fade-up">
      <Row className='margin-L L-40px' style={{width:'100%',display:'flex',alignItems:'center',justifyContent:"space-around"}}>
        {cardsData.map((card, index) => (
          <Col key={index} sm={12} md={6} lg={3} className="mb-4">
            <Card style={{ width: '16rem' }}>
              <Card.Img variant="top"  src={card.imgSrc} className='offer-img' style={{ width: '15rem' }} />
              <Card.Body>
                
                <Button variant="success">Shop</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Offerzone;