using UnityEngine;

public class RobotVision : MonoBehaviour
{
    public float detectionDistance = 8f;
    public float eyeHeight = 1.0f;
    public FaceEventSender faceEventSender; // assigner dans Inspector

    void Update()
    {
        Vector3 eyePosition = transform.position + Vector3.up * eyeHeight;

        Debug.DrawRay(eyePosition, transform.forward * detectionDistance, Color.red);

        RaycastHit hit;
        if (Physics.Raycast(eyePosition, transform.forward, out hit, detectionDistance))
        {
            Debug.Log("👀 Raycast hit : " + hit.collider.name);

            if (hit.collider.CompareTag("Human"))
            {
                // ✅ Récupération du composant HumanIdentity
                HumanIdentity human = hit.collider.GetComponent<HumanIdentity>();
                if (human != null)
                {
                    Debug.Log("🔥 FACE DETECTED : " + human.personId);

                    if (faceEventSender != null)
                    {
                        Debug.Log("🔥 FACE DETECTED : " + hit.collider.name);
                        faceEventSender.OnFaceDetected(human);
                    }
                    else
                    {
                        Debug.LogWarning("FaceEventSender not assigned in Inspector!");
                    }
                }
                else
                {
                    Debug.LogError("No HumanIdentity component found on " + hit.collider.name);
                }
            }
        }
    }
}

