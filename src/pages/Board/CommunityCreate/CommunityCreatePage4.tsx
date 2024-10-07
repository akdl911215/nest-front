import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommunity } from '../../../contexts/CommunityContext';
import { CommunitySubmitAPI } from '../../api/CommunityApi';
import { CommunityVisibilityType } from '../../../_common/CollectionTypes';
import { CommunityTagsSubmitAPI } from '../../api/CommunityTagsAPI';
import { FaGlobe, FaLock, FaUsers } from 'react-icons/fa'; // Importing icons from react-icons
import styled from 'styled-components';
import MultiStepNav from '../../../components/Buttons/MultiStepNav';
import Button from '../../../components/Buttons/Button';

const CommunityCreatePage4: FC = () => {
  const navigate = useNavigate();
  const { communityName, description, banner, icon, topics } = useCommunity();
  const [visibility, setVisibility] =
    useState<CommunityVisibilityType>('PUBLIC');

  useEffect(() => {
    console.log('topics : ', topics);
  }, [topics]);

  const [isCommunity, setIsCommunity] = useState<{
    readonly name: string;
    readonly description: string;
    readonly banner?: string | null;
    readonly icon?: string | null;
    readonly visibility: CommunityVisibilityType;
    readonly topics: string[];
  }>({
    name: communityName,
    description: description,
    banner: banner,
    icon: icon,
    visibility: 'PUBLIC',
    topics: [],
  });

  const handleSubmit = async (): Promise<void> => {
    const coRes = await CommunitySubmitAPI({
      name: isCommunity.name,
      description: isCommunity.description,
      banner: isCommunity.banner,
      icon: isCommunity.icon,
      visibility: isCommunity.visibility,
    });

    if (!coRes) return;
    const coResponse = await coRes.data.response;
    console.log('community Submit coResponse : ', coResponse);

    const tagResponse = [];
    if (topics.length > 0) {
      const tagRes = await CommunityTagsSubmitAPI({
        tags: topics,
        communityId: coResponse.id,
      });
      if (!tagRes) return;
      console.log('tagRes : ', tagRes);
      tagResponse.push(tagRes.data.response);
    }
    console.log('tagResponse : ', tagResponse);
    setIsCommunity({
      ...coResponse,
      topic: tagResponse,
    });

    navigate('/');
  };

  const handleBack = () => {
    navigate('/community/create3');
  };

  return (
    <Container>
      <Heading>커뮤니티 공개 설정</Heading>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <Label>
            <Radio
              type='radio'
              name='visibility'
              value='public'
              checked={visibility === 'PUBLIC'}
              onChange={() => setVisibility('PUBLIC')}
            />
            <OptionContent>
              <FaGlobe />
              <div>
                <OptionTitle>공개</OptionTitle>
                <OptionDescription>
                  모든 사용자가 이 커뮤니티를 볼 수 있습니다.
                </OptionDescription>
              </div>
            </OptionContent>
          </Label>
        </FormGroup>

        <FormGroup>
          <Label>
            <Radio
              type='radio'
              name='visibility'
              value='restricted'
              checked={visibility === 'RESTRICTED'}
              onChange={() => setVisibility('RESTRICTED')}
            />
            <OptionContent>
              <FaUsers />
              <div>
                <OptionTitle>제한</OptionTitle>
                <OptionDescription>
                  모든 사용자가 이 커뮤니티를 볼 수 있지만, 참여하려면 승인이
                  필요합니다.
                </OptionDescription>
              </div>
            </OptionContent>
          </Label>
        </FormGroup>

        <FormGroup>
          <Label>
            <Radio
              type='radio'
              name='visibility'
              value='private'
              checked={visibility === 'PRIVATE'}
              onChange={() => setVisibility('PRIVATE')}
            />
            <OptionContent>
              <FaLock />
              <div>
                <OptionTitle>비공개</OptionTitle>
                <OptionDescription>
                  초대된 사용자만 이 커뮤니티를 볼 수 있습니다.
                </OptionDescription>
              </div>
            </OptionContent>
          </Label>
          <UserSearchInput/>
        </FormGroup>

        <MultiStepNav>
          <Button type='button' onClick={handleBack} bgColor='cancel'>
            이전
          </Button>
          <Button type='button' onClick={handleSubmit} bgColor='next'>
            완료
          </Button>
        </MultiStepNav>
      </Form>
    </Container>
  );
};

export default CommunityCreatePage4;

// Styled Components
const Container = styled.div`
  background-color: #ffffff;
  padding: 20px;
  max-width: 600px;
  height: auto;
  margin: 50px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  border: 1px solid #ededed;
`;

const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
  font-weight: bold;
  cursor: pointer;
`;

const Radio = styled.input`
  margin-right: 10px;
`;

const OptionContent = styled.div`
  display: flex;
  align-items: center;
`;

const OptionTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const OptionDescription = styled.div`
  font-size: 12px;
  color: #888;
`;

const UserSearchInput = styled.input`
  border-radius: 25px;
  height: 25px;
  width: 90%;
  margin: 5px 0 0 30px;
`
