from sqlalchemy.orm import Session

from app.models.translation import Translation


def get_translation(
    db: Session,
    entity_type: str,
    entity_id: str,
    field_name: str,
    language_code: str,
):
    return (
        db.query(Translation)
        .filter(
            Translation.entity_type == entity_type,
            Translation.entity_id == entity_id,
            Translation.field_name == field_name,
            Translation.language_code == language_code,
        )
        .first()
    )


def set_translation(
    db: Session,
    entity_type: str,
    entity_id: str,
    field_name: str,
    language_code: str,
    translated_text: str,
):
    translation = get_translation(
        db,
        entity_type,
        entity_id,
        field_name,
        language_code,
    )

    if translation:
        translation.translated_text = translated_text

    else:
        translation = Translation(
            entity_type=entity_type,
            entity_id=entity_id,
            field_name=field_name,
            language_code=language_code,
            translated_text=translated_text,
        )

        db.add(translation)

    db.commit()
    db.refresh(translation)

    return translation