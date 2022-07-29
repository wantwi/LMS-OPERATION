import React from "react";
import { Progress } from "reactstrap";

const Example = () => {
    return (
        <div className="progress-block">
            <div className="text-center">Plain</div>
            <Progress multi>
                <Progress bar value="15" />
                <Progress bar className="c-success" value="20" />
                <Progress bar className="c-info" value="25" />
                <Progress bar className="c-warning" value="20" />
                <Progress bar className="c-danger" value="15" />
            </Progress>
            <div className="text-center">With Labels</div>
            <Progress multi>
                <Progress bar value="15">
                    Meh
                </Progress>
                <Progress bar className="c-success" value="35">
                    Wow!
                </Progress>
                <Progress bar className="c-warning" value="25">
                    25%
                </Progress>
                <Progress bar className="c-danger" value="25">
                    LOOK OUT!!
                </Progress>
            </Progress>
            <div className="text-center">Stripes and Animations</div>
            <Progress multi>
                <Progress bar striped value="15">
                    Stripes
                </Progress>
                <Progress bar animated className="c-success" value="30">
                    Animated Stripes
                </Progress>
                <Progress bar className="c-info" value="25">
                    Plain
                </Progress>
            </Progress>
        </div>
    );
};

export default Example;