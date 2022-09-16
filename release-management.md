# Release Management

Release managers are responsible for the release management lifecycle, focusing on coordinating various aspects of production and projects into one integrated solution. They are responsible for ensuring that resources, timelines, and the overall quality of the process are all considered and accounted for. 

# Steps of Release Management

## Release planning: 
In this stage, release manager will elaborate a plan for the coming release. 
Together with the team, the release manager will form a list of issues and PRs that should be addressed during the release.
More generally and a non negligeable part of the planning is to properly ensure that bugs, issues that weren't totally identified in the roadmap, and the roadmap issues are still being processed as they should.

## Configuring releases: 
Release managers will oversee the various aspects of a project before it is due to be deployed, ensuring everyone is on track and meeting the agreed timeline.

## Quality checks:
The quality of the release needs to be reviewed before a project is officially launched.
The release manager is in charge of ensuring manual testing is properly planned and done.
During the feature freeze time, only the release manager has permission to merge pull requests. As staging should at this point be already deployed, this is to ensure that the release manager has enough visibility on the changes being applied.
Also that unit testing and e2e for new feaures have been included.

## Deployment: 
After being quality checked, the project is ready to be deployed. 
The release manager is still responsible for ensuring a project is rolled out smoothly and efficiently.

# Release Manager Role:

## Responsibilities overview:

 - Planning release windows and the overall release lifecycle.
 - Managing risks that may affect release scope.
 - Measure and monitor progress.
 - Ensure releases are delivered within requirements.
 - Manage relationships and coordinate projects.

## Detailed Responsibilities:

 - Lead the daily standup meeting.
 - 10 minutes or more are reserved at the end of the daily standup meeting where the release manager update the team on the opened PRs (PRs which aim to be delivered in the planned release). 
 - Regular check for new filed issues, identify those that requires to be published (included in the release)
 - In some really specific situation, it could be required to deploy intermediate releases (e.g critical bug fixes).
 - Planning, refinement, retrospective meetings have to be organized by the release manager and any other required meetings.
 - Release manager should feel free to implement new techniques and put their own finger print to their release, this could potentially benefit upcoming releases.

## Assignments:

Aniket, Liana, David, Rob, Filip, Yann
