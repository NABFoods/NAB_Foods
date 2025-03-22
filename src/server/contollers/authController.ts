import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const authController = {
  // Google login token verification
  googleLogin: async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;

    try {
      // Verify Google ID token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      // Extract user info from the token
      const payload = ticket.getPayload();
      const userEmail = payload?.email;

      if (!userEmail) {
        return next({
          log: 'Invalid token',
          status: 403,
          message: 'Invalid token',
        });
      }
      // Get allowed emails from .env & split them into an array or assigning to empty array if no .env variable found
      const allowedEmails = process.env.ALLOWED_EMAILS?.split(',') || [];

      if (!allowedEmails.includes(userEmail)) {
        return next({
          log: 'email not found/recognized/authorized',
          status: 403,
          message: 'Unauthorized email',
        });
      }

      // If it passes, store user info in session
      req.session.user = { email: userEmail };
      res.status(200).json({
        success: true,
        user: { email: userEmail },
      });
      return next();
    } catch (error) {
      console.error(
        'authController.googleLogin - Google login verification failed:',
        error
      );
      return next({
        log: 'googleLogin - Error in Google login verification',
        status: 500,
        message: { error: 'Google login failed' },
      });
    }
  },
  // Controls user logout and clearning session
  logout: (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((err: any) => {
        if(err) {
            return next({
                log: "logout - Failed to logout",
                status: 500,
                message: "logout - Logout failed."
            })
        }
        // // This would clear a session cookie
        // res.clearCookie('connect.sid'); 
        res.status(200).json({ success: true });
        return next();
    })
  },
  //Session checker
  checkSession: (req: Request, res: Response, next: NextFunction): void => {
    if (req.session.user) {
        res.status(200).json({ success: true, user: req.session.user });
        return next();
    } else {
        res.status(401).json({ success: false, message: 'Not authenticated' });
        return next();
    }
  }
};

export default authController;