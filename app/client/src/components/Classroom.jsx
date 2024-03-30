import styled from 'styled-components/native';

const ClassroomView = styled.View`
  flex-direction: row;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;

const ClassroomImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-right: 12px;
`;

const ClassroomTitle = styled.Text`
  font-size: 17px;
  font-weight: 700;
`;

const ClassroomDetails = styled.View`
  flex: 1;
  justify-content: center;
`;

const ClassroomDescription = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 2px;
`;

/**
 * @param {string} str classroom title.
 * @returns {string}
 */
const truncateTitle = (str) => {
  if (str.length >= 50) {
    return str.substring(0, 50) + '...';
  }
  return str;
};

/**
 * @param {string} str classroom description.
 * @returns {string}
 */
const truncateDescription = (str) => {
  if (str.length >= 50) {
    return str.substring(0, 50) + '...';
  }
  return str;
}

/**
 * @param {string} title classroom title.
 * @param {string} imageUrl classroom icon path.
 * @param {string} description classroom description.
 * @returns {JSX.Element}
 */
export const Classroom = ({ title, imageUrl, description }) => {
  return (
    <ClassroomView>
      <ClassroomImage source={ { uri: imageUrl } }/>
      <ClassroomDetails>
        <ClassroomTitle>{ truncateTitle(title) }</ClassroomTitle>
        <ClassroomDescription>{ truncateDescription(description) }</ClassroomDescription>
      </ClassroomDetails>
    </ClassroomView>);
};
