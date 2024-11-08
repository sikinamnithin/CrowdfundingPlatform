// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrowdfundingPlatform {
    struct Milestone {
        string description;
        uint amount;
        bool isApproved;
        uint yesVotes;
        uint noVotes;
        mapping(address => bool) hasVoted;
    }

    struct Project {
        address payable creator;
        string title;
        uint totalFunded;
        uint currentMilestone;
        bool completed;
        mapping(uint => Milestone) milestones;
        uint milestoneCount;
    }

    uint public minimumContribution = 1 ether; // Set the minimum contribution threshold
    mapping(address => uint) public contributions;
    mapping(address => bool) public hasVotingRights;
    mapping(uint => Project) public projects;
    uint public projectCount = 0;

    event ProjectCreated(uint projectId, address creator, string title);
    event ContributionMade(uint projectId, address contributor, uint amount);
    event MilestoneApproved(uint projectId, uint milestoneId);

    modifier onlyContributors(uint projectId) {
        require(contributions[msg.sender] >= minimumContribution, "Only eligible contributors can vote.");
        _;
    }

    function createProject(string memory _title, string[] memory _milestoneDescriptions, uint[] memory _milestoneAmounts) public {
        require(_milestoneDescriptions.length == _milestoneAmounts.length, "Milestones and amounts must match.");

        projectCount++;
        Project storage project = projects[projectCount];
        project.creator = payable(msg.sender);
        project.title = _title;

        for (uint i = 0; i < _milestoneDescriptions.length; i++) {
            project.milestones[i] = Milestone({
                description: _milestoneDescriptions[i],
                amount: _milestoneAmounts[i],
                isApproved: false,
                yesVotes: 0,
                noVotes: 0
            });
            project.milestoneCount++;
        }

        emit ProjectCreated(projectCount, msg.sender, _title);
    }

    function contribute(uint projectId) public payable {
        require(msg.value > 0, "Contribution must be greater than zero.");
        Project storage project = projects[projectId];
        require(project.creator != address(0), "Project does not exist.");

        project.totalFunded += msg.value;
        contributions[msg.sender] += msg.value;

        if (contributions[msg.sender] >= minimumContribution) {
            hasVotingRights[msg.sender] = true;
        }

        emit ContributionMade(projectId, msg.sender, msg.value);
    }

    function voteOnMilestone(uint projectId, uint milestoneId, bool approve) public onlyContributors(projectId) {
        Project storage project = projects[projectId];
        require(project.creator != address(0), "Project does not exist.");
        require(milestoneId < project.milestoneCount, "Milestone does not exist.");
        Milestone storage milestone = project.milestones[milestoneId];
        require(!milestone.hasVoted[msg.sender], "You have already voted on this milestone.");

        if (approve) {
            milestone.yesVotes += 1;
        } else {
            milestone.noVotes += 1;
        }

        milestone.hasVoted[msg.sender] = true;

        uint totalVotes = milestone.yesVotes + milestone.noVotes;
        if (milestone.yesVotes > totalVotes / 2) {
            milestone.isApproved = true;
            releaseFunds(projectId, milestoneId);
        }
    }

    function releaseFunds(uint projectId, uint milestoneId) internal {
        Project storage project = projects[projectId];
        Milestone storage milestone = project.milestones[milestoneId];
        require(milestone.isApproved, "Milestone is not approved.");

        project.creator.transfer(milestone.amount);
        emit MilestoneApproved(projectId, milestoneId);
    }

    function getProjectDetails(uint projectId) public view returns (address, string memory, uint, uint, bool) {
        Project storage project = projects[projectId];
        return (project.creator, project.title, project.totalFunded, project.currentMilestone, project.completed);
    }

    function getMilestoneDetails(uint projectId, uint milestoneId) public view returns (string memory, uint, bool, uint, uint) {
        Project storage project = projects[projectId];
        Milestone storage milestone = project.milestones[milestoneId];
        return (milestone.description, milestone.amount, milestone.isApproved, milestone.yesVotes, milestone.noVotes);
    }
}
