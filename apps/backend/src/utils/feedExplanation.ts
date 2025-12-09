export function explainFeedScore(post, userInterestVector) {
  const explanations = [];

  if (post.distance < 0.25) explanations.push("High semantic similarity to your interests.");
  else if (post.distance < 0.45) explanations.push("Moderate semantic match with your interests.");

  if (post.engagement_score > 7)
    explanations.push("High engagement score from the community.");

  if (post.age_hours < 24)
    explanations.push("This post is new and trending.");

  if (post.topic)
    explanations.push(`You often engage with '${post.topic}' topics.`);

  return explanations;
}
