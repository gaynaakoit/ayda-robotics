using UnityEngine;

public class RobotMovement : MonoBehaviour
{
    [Header("Déplacement")]
    public float speed = 2f;
    public float moveDistance = 10f;

    private Vector3 startPosition;
    private bool goingForward = true;

    void Start()
    {
        startPosition = transform.position;
        Debug.Log("🤖 Robot position initiale enregistrée");
    }

    void Update()
    {
        float step = speed * Time.deltaTime;

        if (goingForward)
        {
            transform.Translate(Vector3.forward * step);

            float distance = Vector3.Distance(startPosition, transform.position);
            Debug.Log("➡️ Avance : " + distance.ToString("F2") + " m");

            if (distance >= moveDistance)
            {
                goingForward = false;
            }
        }
        else
        {
            transform.Translate(Vector3.back * step);

            float distance = Vector3.Distance(startPosition, transform.position);
            Debug.Log("⬅️ Retour : " + distance.ToString("F2") + " m");

            if (distance <= 0.1f)
            {
                goingForward = true;
            }
        }
    }
}

