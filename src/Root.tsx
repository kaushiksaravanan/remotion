import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
import {PortfolioTypo} from './PortfolioTypo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          titleText: 'Hello World',
          titleColor: '#ffffff',
        }}
      />
      <Composition
        id="PortfolioTypo"
        component={PortfolioTypo}
        durationInFrames={870}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
