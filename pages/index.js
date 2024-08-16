import ActivityCard from "@/components/ActivityCard";
import { StyledList } from "@/styles";
import CategoryIcons from "@/components/CategoryIcons";
import { useSession } from "next-auth/react";
import { useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { Icon } from "@/components/Icon";

const MapOverView = dynamic(() => import("@/components/MapOverView"), {
  ssr: false,
});

export default function HomePage({
  onToggleFavorite,
  onSelect,
  selectedCategory,
  activityData,
  userData,
}) {
  const { data: session } = useSession();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const markersData = activityData.map((activity) => {
    return {
      geoCode: [activity.lat, activity.lng],
      popUp: `Activity: ${activity.title}`,
    };
  });
  function handleMapView() {
    setIsMapOpen(!isMapOpen);
  }
  return (
    <>
      <CategoryIcons onSelect={onSelect} selectedCategory={selectedCategory} />
      {isMapOpen ? (
        <MapOverView isMapOverView markers={markersData} />
      ) : (
        <StyledList>
          {activityData.map((activity) => (
            <li key={activity._id}>
              <ActivityCard
                activity={activity}
                onToggleFavorite={onToggleFavorite}
                isFavorite={
                  session
                    ? (userData?.favorites ?? []).includes(activity._id)
                    : false
                }
              />
            </li>
          ))}
        </StyledList>
      )}
      <StyledMapButton type="button" onClick={handleMapView}>
        {isMapOpen ? "Show List" : "Show Map"}
        <Icon name={isMapOpen ? "listIcon" : "mapIcon"} />
      </StyledMapButton>
    </>
  );
}

const StyledMapButton = styled.button`
  position: fixed;
  bottom: 10%;
  left: 50%;
  gap: 0.3125rem;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--background-map-button);
  color: var(--map-button-text);
  border: none;
  line-height: 1.5;
  border-radius: 50px;
  font-size: 16px;
  font-family: var(--font-p);
  box-shadow: var(--box-shadow);
  cursor: pointer;
  z-index: 1000;
  &:hover {
    background-color: var(--light-orange);
  }
  & svg {
    fill: var(--map-button-text);
  }
  @media (min-width: 1200px) {
    font-size: 18px;
    padding: 0.75rem 1.5625rem;
  }
`;
