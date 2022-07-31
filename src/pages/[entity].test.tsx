import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Entity, { getStaticPaths, getStaticProps } from './[entity]';

const TestEntity = (alt = false, guide = false, source = false) => (
  <Entity
    safeURI={`AbyssalSire`}
    name={`Abyssal Sire`}
    altName={alt ? `Abyssal Sire Alt Test` : undefined}
    source={source ? `https://www.youtube.com/watch?v=wnZJl9driUs` : undefined}
    tags={[`slayer`, `boss`]}
    recommendedGuideVideoId={guide ? `wnZJl9driUs` : undefined}
    tiles={[
      {
        regionId: 11850,
        regionX: 25,
        regionY: 34,
        z: 0,
        color: `#FFFFFF00`,
      },
    ]}
    thumbnail={`https://oldschool.runescape.wiki/images/thumb/Abyssal_Sire.png/200px-Abyssal_Sire.png`}
    wiki={`https://oldschool.runescape.wiki/w/Abyssal_Sire`}
  />
);

describe(`Entity`, () => {
  it(`should render correctly`, () => {
    const { container } = render(TestEntity());
    expect(container).toMatchSnapshot();
  });

  it(`should render an optional alt name`, () => {
    const { getByText } = render(TestEntity(true));
    expect(getByText(`Abyssal Sire Alt Test`)).toBeInTheDocument();
  });

  it(`should render an optional guide`, () => {
    const { getByText } = render(TestEntity(false, true));
    expect(getByText(`Recommended Guide:`)).toBeInTheDocument();
  });

  it(`should render an optional source`, () => {
    const { getByText } = render(TestEntity(false, false, true));
    expect(getByText(`Tiles Source`)).toBeInTheDocument();
  });

  it(`should generate the correct runelite tiles link`, () => {
    const { getByText } = render(TestEntity());
    const link = getByText(`View Tiles on RuneLite`);
    link.hasAttribute(`href`);

    expect(link.getAttribute(`href`)).toBe(
      `https://runelite.net/tile/show/#W3sicmVnaW9uSWQiOjExODUwLCJyZWdpb25YIjoyNSwicmVnaW9uWSI6MzQsInoiOjAsImNvbG9yIjoiI0ZGRkZGRjAwIn1d`,
    );
  });

  it(`should get the correct static props`, async () => {
    const { props } = await getStaticProps({
      params: { entity: `abyssal sire` },
    });

    expect(props?.name).toBe(`Abyssal Sire`);
    expect(props?.tags).toEqual([`slayer`, `boss`]);
  });

  it(`should get the correct static paths`, async () => {
    const { paths } = await getStaticPaths();
    expect(paths).toContainEqual({
      params: { entity: `abyssal sire` },
    });
  });
});