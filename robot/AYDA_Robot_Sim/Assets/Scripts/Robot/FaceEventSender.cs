using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using System.Text;

public class FaceEventSender : MonoBehaviour
{
    public string backendUrl = "http://199.247.10.184:3000/events/face-detected";

    // Appelé par RobotVision
    public void OnFaceDetected(HumanIdentity human)
    {
        if (human == null)
        {
            Debug.LogWarning("OnFaceDetected called with null human!");
            return;
        }

        Debug.Log("👀 OnFaceDetected called for " + human.personId);
        StartCoroutine(SendFaceEvent(human));
    }

    IEnumerator SendFaceEvent(HumanIdentity human)
    {
        // Création de l'objet DTO conforme au backend
        FaceEventDTO dto = new FaceEventDTO
        {
            faces = new FaceData[]
            {
                new FaceData
                {
                    personId = human.personId,
                    confidence = human.isKnown ? 0.92f : 0.45f,
                    timestamp = System.DateTime.UtcNow.ToString("o"),
                    box = new FaceBox
                    {
                        x = Random.Range(0f, 1f),    // simulation
                        y = Random.Range(0f, 1f),
                        width = 0.2f,
                        height = 0.3f
                    }
                }
            }
        };

        string json = JsonUtility.ToJson(dto);
        Debug.Log("📡 Sending FACE_DETECTED JSON: " + json);

        UnityWebRequest request = new UnityWebRequest(backendUrl, "POST");
        byte[] body = Encoding.UTF8.GetBytes(json);
        request.uploadHandler = new UploadHandlerRaw(body);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
            Debug.Log("📡 FACE_DETECTED successfully sent");
        else
            Debug.LogError("❌ Error sending FACE_DETECTED: " + request.error);
    }
}

// ✅ DTO conforme au backend

[System.Serializable]
public class FaceBox
{
    public float x;
    public float y;
    public float width;
    public float height;
}

[System.Serializable]
public class FaceData
{
    public string personId;
    public float confidence;
    public string timestamp;
    public FaceBox box;
}

[System.Serializable]
public class FaceEventDTO
{
    public FaceData[] faces;
}
