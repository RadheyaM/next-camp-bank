import SearchByName from '../../components/forms/SearchByName'
import Card from '@/components/UI/Card';
import MyList from '@/components/UI/List';

const searchName = () => {
  return (
    <Card>
      <SearchByName></SearchByName>
      <MyList></MyList>
    </Card>
  )
};

export default searchName;
