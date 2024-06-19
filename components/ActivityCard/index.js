import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import StyledImageComponent from "../StyledImage";

export default function ActivityCard({ activity }) {
  return (
    <article>
      <Link href={`/${activity.id}`}>
        <StyledImageComponent src={activity.image} alt={activity.title} />
        <h2>{activity.title}</h2>
      </Link>
      <span>
        {activity.area}, {activity.country}
      </span>
      <br />
      <span>{activity.category.join(", ")}</span>
    </article>
  );
}
