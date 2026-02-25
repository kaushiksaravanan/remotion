import {Composition} from 'remotion';
import {Static1GreenBubble} from './SendblueStatics/Static1GreenBubble';
import {Static2FunnelFlow} from './SendblueStatics/Static2FunnelFlow';
import {Static3VSLvsIMessage} from './SendblueStatics/Static3VSLvsIMessage';
import {Static4Warning} from './SendblueStatics/Static4Warning';
import {Static5DeliveryChannel} from './SendblueStatics/Static5DeliveryChannel';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Sendblue Static Creatives (1080x1080, ~5s each) */}
      <Composition
        id="Static1GreenBubble"
        component={Static1GreenBubble}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="Static2FunnelFlow"
        component={Static2FunnelFlow}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="Static3VSLvsIMessage"
        component={Static3VSLvsIMessage}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="Static4Warning"
        component={Static4Warning}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="Static5DeliveryChannel"
        component={Static5DeliveryChannel}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
