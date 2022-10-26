import { useNavigate } from 'react-router-dom';

import { BackgroundImage, Body, DirectoryContainer } from './directory-item.styles';

const DirectoryItem = ({ category }) => {
    const { title, imageUrl, route } = category;

    const navigate = useNavigate();

    const onNavigateHander = () => navigate(route);

    return (
        <DirectoryContainer onClick={onNavigateHander}>
            {/* <div
                className='background-image'                
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            /> */}
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title.toUpperCase()}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryContainer>
    )
}
export default DirectoryItem;