import { ErrorHandler, Injectable } from '@angular/core';
import * as trackerjet from 'trackerjet';

@Injectable()
export class TrackJsErrorHandler implements ErrorHandler {
    public handleError(error: any) {
        // Add the error message to the telemetry timeline.
        // It can occasionally have useful additional context.
        console.error(error);

        // Assumes we have already loaded and configured TrackJS*
        trackerjet.track({
                userId: "testUserId from angular",
                sessionId: "test sessionId from angular",
                stack: JSON.stringify(error),
                message: "test message from angular"
        });
    }
}